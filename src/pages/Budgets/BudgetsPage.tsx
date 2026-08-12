import { useState } from 'react';
import { StatCard } from '../../components/ui/StatCard/StatCard';
import { AddBudgetForm } from '../../components/ui/AddBudgetForm/AddBudgetForm';
import { BudgetListItem } from '../../components/ui/BudgetListItem/BudgetListItem';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';
import type { NewBudget } from '../../components/ui/AddBudgetForm/AddBudgetForm.types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addBudget, deleteBudget } from '../../store/budgetsSlice';
import { selectBudgetsWithProgress } from '../../store/selectors';
import './BudgetsPage.css';

const BudgetsPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
  const budgets = useAppSelector(selectBudgetsWithProgress);
  const budgetsError = useAppSelector((state) => state.budgets.error);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const askDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteBudget(deleteId));
    }
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const budgetToDelete = budgets.find((budget) => budget.id === deleteId);
  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.limit, 0);

  const handleAdd = (newBudget: NewBudget) => {
    dispatch(addBudget({
      categoryId: newBudget.categoryId,
      limit: newBudget.limit,
      month: newBudget.month,
    }));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Budgets</h1>
        <p className="page-subtitle">Set limits and watch your progress.</p>
      </div>

      {budgetsError && <p className="page-error">{budgetsError}</p>}

      <StatCard
        label="Total budgeted"
        value={`$${totalBudgeted.toFixed(2)}`}
        subtitle={`${budgets.length} budgets`}
      />

      <AddBudgetForm categories={categories} onAdd={handleAdd} />

      {budgets.map((budget) => (
        <BudgetListItem
          key={budget.id}
          id={budget.id}
          name={budget.categoryName}
          color={budget.color}
          monthLabel={budget.monthLabel}
          spent={budget.spent}
          limit={budget.limit}
          onDelete={askDelete}
        />
      ))}

      {deleteId && budgetToDelete && (
        <ConfirmDialog
          title="Delete budget?"
          message={`This will remove "${budgetToDelete.categoryName}" permanently.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export { BudgetsPage };
