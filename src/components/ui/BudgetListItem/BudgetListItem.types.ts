export interface BudgetListItemProps {
  id: string;
  name: string;          // "Groceries"
  color: string;
  monthLabel: string;    // "Jun 2026"
  spent: number;         // raw
  limit: number;         // raw
  onDelete: (id: string) => void;
}
