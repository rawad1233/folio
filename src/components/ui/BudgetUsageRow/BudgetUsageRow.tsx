import type { BudgetUsageRowProps } from './BudgetUsageRow.types';
import './BudgetUsageRow.css';

const BudgetUsageRow = ({ name, color, spent, limit }: BudgetUsageRowProps) => {
  const percent = (spent / limit) * 100;
  const isOver = spent > limit;
  const barWidth = Math.min(percent, 100);

  return (
    <div className="budget-usage-row">
      <div className="budget-usage-row-top">
        <span
          className="budget-usage-row-dot"
          style={{ backgroundColor: color }}
        />
        <span className="budget-usage-row-name">{name}</span>
        {isOver && <span className="budget-usage-row-over-badge">Over</span>}
        <span className="budget-usage-row-amount">
          ${spent.toFixed(2)}
          <span className="budget-usage-row-limit"> / ${limit.toFixed(2)}</span>
        </span>
      </div>

      <div className="budget-usage-row-track">
        <div
          className="budget-usage-row-fill"
          style={{
            width: `${barWidth}%`,
            backgroundColor: isOver ? '#dc2626' : color,
          }}
        />
      </div>
    </div>
  );
};

export { BudgetUsageRow };
