import type { CategoryOption } from '../AddExpenses/AddExpenseForm.types';

export interface NewBudget {
  categoryId: string;
  limit: number;
  month: string;         // "2026-06"
}

export interface AddBudgetFormProps {
  categories: CategoryOption[];
  onAdd: (budget: NewBudget) => void;
}
