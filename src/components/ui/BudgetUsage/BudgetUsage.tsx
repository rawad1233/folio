import { BudgetUsageRow } from '../BudgetUsageRow/BudgetUsageRow';
import type { BudgetUsageProps } from './BudgetUsage.types';
import './BudgetUsage.css';

const BudgetUsage = ({ title, rows }: BudgetUsageProps) => {
  return (
    <div className="budget-panel">
      <h2 className="budget-panel-title">Budget usage</h2>
      <p className="budget-panel-subtitle">{title}</p>

      {rows.length === 0 ? (
        <p className="budget-panel-empty">No budgets set for this month yet.</p>
      ) : (
        rows.map((row) => (
          <BudgetUsageRow
            key={row.name}
            name={row.name}
            color={row.color}
            spent={row.spent}
            limit={row.limit}
          />
        ))
      )}
    </div>
  );
};

export { BudgetUsage };
