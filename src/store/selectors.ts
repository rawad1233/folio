import type { RootState } from './store';

export interface ExpenseWithCategory {
  id: string;
  title: string;
  amount: number;
  date: string;
  note?: string;
  categoryId: string;
  categoryName: string;   // joined in from the category
  color: string;          // joined in
}

export const selectExpensesWithCategory = (state: RootState): ExpenseWithCategory[] => {
  return state.expenses.items.map((expense) => {
    const category = state.categories.items.find((c) => c.id === expense.categoryId);
    return {
      ...expense,
      categoryName: category ? category.name : 'Unknown',
      color: category ? category.color : '#9ca3af',
    };
  });
};

export const selectCategoriesWithCount = (state: RootState) =>
  state.categories.items.map((category) => ({
    ...category,
    expenseCount: state.expenses.items.filter((e) => e.categoryId === category.id).length,
  }));

const monthLabelFromKey = (monthKey: string): string => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export interface BudgetWithProgress {
  id: string;
  categoryId: string;
  categoryName: string;
  color: string;
  month: string;
  monthLabel: string;
  spent: number;
  limit: number;
}

// a budget's "spent" is the sum of expenses in its category, within its month
export const selectBudgetsWithProgress = (state: RootState): BudgetWithProgress[] => {
  return state.budgets.items.map((budget) => {
    const category = state.categories.items.find((c) => c.id === budget.categoryId);
    const spent = state.expenses.items
      .filter((e) => e.categoryId === budget.categoryId && e.date.startsWith(budget.month))
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      id: budget.id,
      categoryId: budget.categoryId,
      categoryName: category ? category.name : 'Unknown',
      color: category ? category.color : '#9ca3af',
      month: budget.month,
      monthLabel: monthLabelFromKey(budget.month),
      spent,
      limit: budget.limit,
    };
  });
};

export interface DashboardSpendingRow {
  name: string;
  color: string;
  amount: number;
  percent: number;
}

export interface DashboardBudgetRow {
  name: string;
  color: string;
  spent: number;
  limit: number;
}

export interface DashboardStats {
  totalSpentAllTime: number;
  totalExpenseCount: number;
  monthSpent: number;
  previousMonthSpent: number;
  topCategory: DashboardSpendingRow | null;
  spendingRows: DashboardSpendingRow[];
  budgetRows: DashboardBudgetRow[];
}

// monthKey/previousMonthKey are "YYYY-MM"
export const selectDashboardStats = (
  state: RootState,
  monthKey: string,
  previousMonthKey: string
): DashboardStats => {
  const expenses = state.expenses.items;
  const categories = state.categories.items;

  const totalSpentAllTime = expenses.reduce((sum, e) => sum + e.amount, 0);

  const monthExpenses = expenses.filter((e) => e.date.startsWith(monthKey));
  const monthSpent = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const previousMonthSpent = expenses
    .filter((e) => e.date.startsWith(previousMonthKey))
    .reduce((sum, e) => sum + e.amount, 0);

  const spendingRows: DashboardSpendingRow[] = categories
    .map((category) => {
      const amount = monthExpenses
        .filter((e) => e.categoryId === category.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        name: category.name,
        color: category.color,
        amount,
        percent: monthSpent > 0 ? Math.round((amount / monthSpent) * 100) : 0,
      };
    })
    .filter((row) => row.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const budgetRows: DashboardBudgetRow[] = state.budgets.items
    .filter((budget) => budget.month === monthKey)
    .map((budget) => {
      const category = categories.find((c) => c.id === budget.categoryId);
      const spent = monthExpenses
        .filter((e) => e.categoryId === budget.categoryId)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        name: category ? category.name : 'Unknown',
        color: category ? category.color : '#9ca3af',
        spent,
        limit: budget.limit,
      };
    });

  return {
    totalSpentAllTime,
    totalExpenseCount: expenses.length,
    monthSpent,
    previousMonthSpent,
    topCategory: spendingRows.length > 0 ? spendingRows[0] : null,
    spendingRows,
    budgetRows,
  };
};
