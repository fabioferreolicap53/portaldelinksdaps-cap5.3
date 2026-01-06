
import React, { useState, useEffect, useCallback } from 'react';
import { LinkItem, UserRole, AuthState } from './types';
import { ACCESS_KEYS } from './constants';
import LinkCard from './components/LinkCard';
import AddLinkModal from './components/AddLinkModal';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, role: UserRole.VISITOR });
  const [accessKey, setAccessKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);

  // Fetch links from Supabase
  const fetchLinks = useCallback(async () => {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching links:', error);
    } else if (data) {
      const mappedLinks: LinkItem[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        icon: item.icon,
        colorClass: item.color_class,
        bgClass: item.bg_class
      }));
      setLinks(mappedLinks);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // Auto-hide copy feedback
  useEffect(() => {
    if (copyFeedback) {
      const timer = setTimeout(() => setCopyFeedback(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyFeedback]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === ACCESS_KEYS.admin) {
      setAuth({ isLoggedIn: true, role: UserRole.ADMIN });
      setAccessKey('');
    } else if (accessKey === ACCESS_KEYS.user) {
      setAuth({ isLoggedIn: true, role: UserRole.USER });
      setAccessKey('');
    } else {
      alert('Chave de acesso inválida!');
    }
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: UserRole.VISITOR });
  };

  const handleSaveLink = async (linkData: Omit<LinkItem, 'id'>) => {
    let error;

    if (editingLink) {
      // Update existing link
      const result = await supabase
        .from('links')
        .update({
          title: linkData.title,
          url: linkData.url,
          icon: linkData.icon,
          // Colors are preserved from editingLink or passed back from modal, 
          // but modal passes back what's in state. 
          // LinkModal uses existing colors if editing.
          color_class: linkData.colorClass,
          bg_class: linkData.bgClass
        })
        .eq('id', editingLink.id);
      error = result.error;
    } else {
      // Insert new link
      const result = await supabase
        .from('links')
        .insert([{
          title: linkData.title,
          url: linkData.url,
          icon: linkData.icon,
          color_class: linkData.colorClass,
          bg_class: linkData.bgClass
        }]);
      error = result.error;
    }

    if (error) {
      console.error('Error saving link:', error);
      alert('Erro ao salvar link.');
    } else {
      fetchLinks();
      setIsModalOpen(false);
      setEditingLink(null);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (confirm('Deseja realmente excluir este link?')) {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting link:', error);
        alert('Erro ao excluir link.');
      } else {
        fetchLinks();
      }
    }
  };

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleOpenNewLinkModal = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  const handleCopyLink = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopyFeedback('Link copiado!');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-10 pb-20 md:p-10 gap-6">
      <div className="w-full max-w-[600px] flex flex-col gap-6">

        {/* Main Link Portal Card */}
        <div className="w-full bg-white dark:bg-[#1a202c] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl">

          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-[#1e3a8a]">
            <div>
              <h2 className="text-xl font-bold text-white">Portal de Links</h2>
              <p className="text-sm text-white">DAPS/CAP5.3</p>
            </div>

            {auth.role === UserRole.ADMIN && (
              <button
                onClick={handleOpenNewLinkModal}
                className="h-9 px-4 bg-white dark:bg-[#2d3748] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#111318] dark:text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">add_link</span>
                <span className="hidden sm:inline">Novo Link</span>
              </button>
            )}
          </div>

          {/* Links List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800 min-h-[100px]">
            {links.length > 0 ? (
              links.map(link => (
                <LinkCard
                  key={link.id}
                  link={link}
                  isAdmin={auth.role === UserRole.ADMIN}
                  onDelete={handleDeleteLink}
                  onCopy={handleCopyLink}
                  onEdit={handleEditLink}
                />
              ))
            ) : (
              <div className="p-10 text-center text-gray-400 dark:text-gray-600 italic">
                Nenhum link cadastrado.
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-3 text-center border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-[#616f89] dark:text-gray-500">
              Logado como: <span className="font-semibold text-primary">{auth.role}</span>
              {auth.isLoggedIn && (
                <>
                  <span className="mx-2">•</span>
                  <button onClick={handleLogout} className="hover:underline hover:text-red-500 transition-colors">Sair</button>
                </>
              )}
            </p>


          </div>
        </div>

        {/* Access Key Section */}
        {!auth.isLoggedIn && (
          <div className="w-full bg-white dark:bg-[#1a202c] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 animate-in slide-in-from-bottom-4 duration-300">
            <form onSubmit={handleLogin} className="flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <label className="text-[#111318] dark:text-gray-200 text-sm font-medium leading-normal mb-2 block" htmlFor="password">
                  Chave de Acesso
                </label>
                <div className="relative flex w-full items-stretch rounded-lg group">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89] dark:text-gray-400 material-symbols-outlined text-[20px]">vpn_key</span>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#111318] dark:text-white border border-[#dbdfe6] dark:border-gray-600 bg-white dark:bg-[#2d3748] h-10 pl-10 pr-4 placeholder:text-[#616f89] dark:placeholder:text-gray-500 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    id="password"
                    name="password"
                    placeholder="Senha de administrador ou usuário"
                    type="password"
                    autoComplete="current-password"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full md:w-auto h-10 px-6 bg-primary hover:bg-primary/90 transition-all text-white text-sm font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 active:scale-95"
                type="submit"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Entrar</span>
              </button>
            </form>
          </div>
        )}
      </div>

      <footer className="mt-auto text-center animate-in fade-in duration-500 delay-150">
        <p className="text-[10px] text-gray-400/80 dark:text-gray-600 font-medium">
          Desenvolvido por Fabio Ferreira de Oliveira - DAPS/CAP5.3
        </p>
      </footer>



      {/* Modals and Notifications */}
      {isModalOpen && (
        <AddLinkModal
          key={editingLink ? editingLink.id : 'new-link'}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveLink}
          initialData={editingLink}
        />
      )}

      {copyFeedback && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-4 duration-200 text-sm font-medium z-[100]">
          <span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span>
          {copyFeedback}
        </div>
      )}
    </div>
  );
};

export default App;
