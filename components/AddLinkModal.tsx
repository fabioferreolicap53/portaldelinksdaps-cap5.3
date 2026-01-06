
import React, { useState } from 'react';
import { LinkItem } from '../types';

interface AddLinkModalProps {
  onClose: () => void;
  onSave: (link: Omit<LinkItem, 'id'>) => void;
  initialData?: LinkItem | null;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [icon, setIcon] = useState(initialData?.icon || 'link');
  const [observations, setObservations] = useState(initialData?.observations || '');

  React.useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setIcon(initialData.icon);
      setObservations(initialData.observations || '');
    } else {
      setTitle('');
      setUrl('');
      setIcon('link');
      setObservations('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) return;

    // Use existing colors if editing, or randomize for new
    let colorClass, bgClass;

    if (initialData) {
      colorClass = initialData.colorClass;
      bgClass = initialData.bgClass;
    } else {
      const presets = [
        { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
        { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
        { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
        { color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30' },
      ];
      const randomPreset = presets[Math.floor(Math.random() * presets.length)];
      colorClass = randomPreset.color;
      bgClass = randomPreset.bg;
    }

    onSave({
      title,
      url,
      icon,
      colorClass,
      bgClass,
      observations
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a202c] rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold dark:text-white">{initialData ? 'Editar Link' : 'Adicionar Novo Link'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-200">Título</label>
            <input
              autoFocus
              required
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-[#2d3748] dark:text-white focus:ring-primary focus:border-primary text-sm"
              placeholder="Ex: Documentação de API"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-200">URL</label>
            <input
              required
              type="url"
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-[#2d3748] dark:text-white focus:ring-primary focus:border-primary text-sm"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-200">Ícone (Material Symbol Name)</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border-gray-200 dark:border-gray-700 dark:bg-[#2d3748] dark:text-white focus:ring-primary focus:border-primary text-sm"
                placeholder="Ex: link, description, code..."
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-gray-200">Observações</label>
            <textarea
              className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-[#2d3748] dark:text-white focus:ring-primary focus:border-primary text-sm min-h-[80px]"
              placeholder="Informações adicionais sobre este link..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 px-4 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 h-10 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              Salvar Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLinkModal;
