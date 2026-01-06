
import React from 'react';
import { LinkItem, UserRole } from '../types';

interface LinkCardProps {
  link: LinkItem;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onCopy: (url: string) => void;
  onEdit: (link: LinkItem) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, isAdmin, onDelete, onCopy, onEdit }) => {
  return (
    <div className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-4 md:gap-6 group">
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${link.bgClass} flex items-center justify-center flex-shrink-0 ${link.colorClass}`}>
        <span className="material-symbols-outlined text-[28px] md:text-[32px]">{link.icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-[#111318] dark:text-white truncate">
          {link.title}
        </h3>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#616f89] dark:text-gray-400 hover:text-primary truncate block hover:underline transition-colors"
        >
          {link.url}
        </a>
      </div>

      <div className="flex items-center gap-1 md:gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          onClick={() => onCopy(link.url)}
          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-all active:scale-95"
          title="Copiar Link"
        >
          <span className="material-symbols-outlined text-[20px]">content_copy</span>
        </button>

        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(link)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all active:scale-95"
              title="Editar Link"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <button
              onClick={() => onDelete(link.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all active:scale-95"
              title="Excluir Link"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkCard;
