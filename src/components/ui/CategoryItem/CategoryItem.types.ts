export interface CategoryItemProps {
  id: string;
  name: string;            // "Groceries"
  color: string;           // "#10b981"
  expenseCount: number;    // 3 -> "3 expenses"
  onDelete: (id: string) => void;
}
