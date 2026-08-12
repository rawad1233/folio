export interface CategoryOption {
  id: string;      // 'c1'
  name: string;    // 'Groceries'
  color: string;   // '#10b981'
}

export interface NewExpense {
  title: string;
  amount: number;
  date: string;        // "2026-06-14"
  categoryId: string;  // 'c1'
  note?: string;
}

export interface AddExpenseFormProps {
  categories: CategoryOption[];
  onAdd: (expense: NewExpense) => void;
}
