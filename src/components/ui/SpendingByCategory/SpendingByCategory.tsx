import { SpendingCategoryRow } from '../SpendingCategoryRow/SpendingCategoryRow';
import type { SpendingByCategoryProps } from './SpendingByCategory.types';
import './SpendingByCategory.css';

const SpendingByCategory = ({ title, rows }: SpendingByCategoryProps) => {
  return (
    <div className="spending-panel">
      <h2 className="spending-panel-title">Spending by category</h2>
      <p className="spending-panel-subtitle">{title}</p>

      {rows.map((row) => (
        <SpendingCategoryRow
          key={row.name}
          name={row.name}
          color={row.color}
          amount={row.amount}
          percent={row.percent}
        />
      ))}
    </div>
  );
};

export { SpendingByCategory };
