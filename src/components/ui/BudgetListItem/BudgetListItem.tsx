import { Trash2 } from 'lucide-react';
import type { BudgetListItemProps } from './BudgetListItem.types';
import './BudgetListItem.css';

const BudgetListItem = ({
  id, name, color, monthLabel, spent, limit, onDelete,
}: BudgetListItemProps) => {
  const percent = (spent / limit) * 100;
  const isOver = spent > limit;
  const barWidth = Math.min(percent, 100);
  const remaining = limit - spent;

  return (
    <div className="budget-list-item">
      <div className="budget-list-item-top">
        <span
          className="budget-list-item-dot"
          style={{ backgroundColor: color }}
        />
        <span className="budget-list-item-name">{name}</span>
        <span className="budget-list-item-month">{monthLabel}</span>
        {isOver && <span className="budget-list-item-over">Over</span>}
        <span className="budget-list-item-amount">
          ${spent.toFixed(2)}
          <span className="budget-list-item-limit"> / ${limit.toFixed(2)}</span>
        </span>
        <button className="budget-list-item-delete" onClick={() => onDelete(id)}>
          <Trash2 size={16} />
        </button>
      </div>

      <div className="budget-list-item-track">
        <div
          className="budget-list-item-fill"
          style={{
            width: `${barWidth}%`,
            backgroundColor: isOver ? '#dc2626' : color,
          }}
        />
      </div>

      <div className="budget-list-item-labels">
        <span>{Math.round(percent)}% used</span>
        <span className={`budget-list-item-left ${isOver ? 'over' : ''}`}>
          {isOver
            ? `$${Math.abs(remaining).toFixed(2)} over`
            : `$${remaining.toFixed(2)} left`}
        </span>
      </div>
    </div>
  );
};

export { BudgetListItem };
