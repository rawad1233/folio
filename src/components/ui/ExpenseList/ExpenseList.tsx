import { ExpenseItem } from '../ExpenseItem/ExpenseItem';
import type { ExpenseListProps } from './ExpenseList.types';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDelete, children }: ExpenseListProps) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <p className="expense-list-summary">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} - ${total.toFixed(2)}
        </p>
        {children}
      </div>

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          categoryName={expense.categoryName}
          color={expense.color}
          date={expense.date}
          amount={expense.amount}
          note={expense.note}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export { ExpenseList };
