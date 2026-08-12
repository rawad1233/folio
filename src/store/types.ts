export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  title: string;
  amount: number;
  date: string;         // "2026-06-13"
  note?: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  limit: number;
  month: string;        // "2026-06"
}
