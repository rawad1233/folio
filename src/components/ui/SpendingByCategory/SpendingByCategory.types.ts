export interface SpendingRow {
  name: string;
  color: string;
  amount: number;
  percent: number;
}

export interface SpendingByCategoryProps {
  title: string;        // "June 2026" under the panel title
  rows: SpendingRow[];
}
