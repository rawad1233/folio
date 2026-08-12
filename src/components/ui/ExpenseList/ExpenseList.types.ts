import type { ReactNode } from 'react';

export interface ExpenseRow {
  id: string;
  title: string;
  categoryName: string;
  color: string;
  date: string;
  amount: number;
  note?: string;
}

export interface ExpenseListProps {
  expenses: ExpenseRow[];
  onDelete: (id: string) => void;
  children?: ReactNode;
}
