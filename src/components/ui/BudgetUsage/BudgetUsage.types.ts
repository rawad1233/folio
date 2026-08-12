export interface BudgetRow {
  name: string;
  color: string;
  spent: number;
  limit: number;
}

export interface BudgetUsageProps {
  title: string;
  rows: BudgetRow[];
}
