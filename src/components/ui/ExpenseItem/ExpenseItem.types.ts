export interface ExpenseItemProps {
  id: string;
  title: string;          // "Costco run"
  categoryName: string;   // "Groceries"
  color: string;          // the dot color
  date: string;           // "2026-06-13"
  amount: number;         // 132.10
  note?: string;          // "Two tickets" (optional)
  onDelete: (id: string) => void;
}
