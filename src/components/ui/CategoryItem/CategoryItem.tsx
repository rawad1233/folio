import { Trash2 } from 'lucide-react';
import type { CategoryItemProps } from './CategoryItem.types';
import './CategoryItem.css';

const CategoryItem = ({ id, name, color, expenseCount, onDelete }: CategoryItemProps) => {
  return (
    <div className="category-item">
      <span
        className="category-item-swatch"
        style={{ backgroundColor: color }}
      />

      <div className="category-item-info">
        <span className="category-item-name">{name}</span>
        <span className="category-item-count">
          {expenseCount} {expenseCount === 1 ? 'expense' : 'expenses'}
        </span>
      </div>

      <button className="category-item-delete" onClick={() => onDelete(id)}>
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export { CategoryItem };
