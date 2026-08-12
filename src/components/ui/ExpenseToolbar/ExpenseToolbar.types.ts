import type { CategoryOption } from '../AddExpenses/AddExpenseForm.types';

export type SortOption = 'default' | 'newest' | 'oldest' | 'high' | 'low';

export interface ExpenseToolbarProps {
  search: string;
  categoryId: string;              // '' = all categories
  sort: SortOption;
  categories: CategoryOption[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}
