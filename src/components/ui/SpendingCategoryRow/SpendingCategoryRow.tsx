import type { SpendingCategoryRowProps } from './SpendingCategoryRow.types';
import './SpendingCategoryRow.css';

const SpendingCategoryRow = ({ name, color, amount, percent }: SpendingCategoryRowProps) => {
  return (
    <div className="spending-category-row">
      <div className="spending-category-row-top">
        <span
          className="spending-category-row-dot"
          style={{ backgroundColor: color }}
        />
        <span className="spending-category-row-name">{name}</span>
        <span className="spending-category-row-amount">
          ${amount.toFixed(2)}
          <span className="spending-category-row-percent"> - {percent}%</span>
        </span>
      </div>

      <div className="spending-category-row-track">
        <div
          className="spending-category-row-fill"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export { SpendingCategoryRow };
