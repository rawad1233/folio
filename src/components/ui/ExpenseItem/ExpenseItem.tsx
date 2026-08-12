import { Trash2 } from 'lucide-react';
import type { ExpenseItemProps } from './ExpenseItem.types';
import './ExpenseItem.css';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ExpenseItem = ({
  id, title, categoryName, color, date, amount, note, onDelete,
}: ExpenseItemProps) => {
  return (
    <div className="expense-item">
      <span className="expense-dot" style={{ backgroundColor: color }} />

      <div className="expense-info">
        <span className="expense-title">{title}</span>
        <span className="expense-meta">
          {categoryName}
          {note && ` - ${note}`}
        </span>
      </div>

      <span className="expense-date">{formatDate(date)}</span>
      <span className="expense-amount">${amount.toFixed(2)}</span>

      <button className="expense-delete" onClick={() => onDelete(id)}>
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export { ExpenseItem };
