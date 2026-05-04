import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { LoadingButton } from './LoadingButton';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  isEditing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  isDeleting = false,
  isEditing = false,
  size = 'md',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {onEdit && (
        <LoadingButton
          onClick={onEdit}
          loading={isEditing}
          loadingText="Editando..."
          disabled={disabled || isDeleting}
          variant="ghost"
          size={size}
          className={`${sizeClasses[size]} text-blue-600 hover:text-blue-700 hover:bg-blue-50`}
          title="Editar"
        >
          <Edit className={iconSizes[size]} />
        </LoadingButton>
      )}
      
      {onDelete && (
        <LoadingButton
          onClick={onDelete}
          loading={isDeleting}
          loadingText="Eliminando..."
          disabled={disabled || isEditing}
          variant="ghost"
          size={size}
          className={`${sizeClasses[size]} text-red-600 hover:text-red-700 hover:bg-red-50`}
          title="Eliminar"
        >
          <Trash2 className={iconSizes[size]} />
        </LoadingButton>
      )}
    </div>
  );
};
