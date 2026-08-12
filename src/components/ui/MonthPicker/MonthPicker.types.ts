export interface MonthPickerProps {
  month: number;   // 0 = January, 5 = June, 11 = December
  year: number;    // 2026
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}
