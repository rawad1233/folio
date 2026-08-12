import { useState } from 'react';
import { ExpenseList } from '../../components/ui/ExpenseList/ExpenseList';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';
import { AddExpenseForm } from '../../components/ui/AddExpenses/AddExpenseForm';
import { ExpenseToolbar } from '../../components/ui/ExpenseToolbar/ExpenseToolbar';
import type { NewExpense } from '../../components/ui/AddExpenses/AddExpenseForm.types';
import type { SortOption } from '../../components/ui/ExpenseToolbar/ExpenseToolbar.types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addExpense, deleteExpense } from '../../store/expensesSlice';
import { selectExpensesWithCategory } from '../../store/selectors';
import './ExpensesPage.css';

const ExpensesPage = () => {
  // store connections
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectExpensesWithCategory);
  const categories = useAppSelector((state) => state.categories.items);
  const expensesError = useAppSelector((state) => state.expenses.error);

  // UI state stays local
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCategoryId, setFilterCategoryId] = useState('');
  const [sort, setSort] = useState<SortOption>('default');

  const handleAdd = (newExpense: NewExpense) => {
    dispatch(addExpense({
      categoryId: newExpense.categoryId,
      title: newExpense.title,
      amount: newExpense.amount,
      date: newExpense.date,
      note: newExpense.note,
    }));
  };

  const askDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteExpense(deleteId));
    }
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const expenseToDelete = expenses.find((expense) => expense.id === deleteId);

  // the pipeline: filter by search -> filter by category -> sort
  const filterCategory = categories.find((c) => c.id === filterCategoryId);

  const visibleExpenses = expenses
    .filter((expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((expense) =>
      filterCategory ? expense.categoryName === filterCategory.name : true
    )
    .sort((a, b) => {
      if (sort === 'newest') return b.date.localeCompare(a.date);
      if (sort === 'oldest') return a.date.localeCompare(b.date);
      if (sort === 'high') return b.amount - a.amount;
      if (sort === 'low') return a.amount - b.amount;
      return b.date.localeCompare(a.date);   // 'default'
    });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Expenses</h1>
        <p className="page-subtitle">Track and search everything you've spent.</p>
      </div>

      {expensesError && <p className="page-error">{expensesError}</p>}

      <AddExpenseForm categories={categories} onAdd={handleAdd} />

      <ExpenseList expenses={visibleExpenses} onDelete={askDelete}>
        <ExpenseToolbar
          search={search}
          categoryId={filterCategoryId}
          sort={sort}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setFilterCategoryId}
          onSortChange={setSort}
        />
      </ExpenseList>

      {deleteId && expenseToDelete && (
        <ConfirmDialog
          title="Delete expense?"
          message={`This will remove "${expenseToDelete.title}" permanently.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export { ExpensesPage };
