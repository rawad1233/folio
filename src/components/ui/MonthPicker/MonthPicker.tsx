import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MonthPickerProps } from './MonthPicker.types';
import './MonthPicker.css';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MonthPicker = ({ month, year, onPrev, onNext, onToday }: MonthPickerProps) => {
  return (
    <div className="month-picker">
      <button className="month-picker-arrow" onClick={onPrev}>
        <ChevronLeft size={16} />
      </button>

      <span className="month-picker-label">
        {monthNames[month]} {year}
      </span>

      <button className="month-picker-arrow" onClick={onNext}>
        <ChevronRight size={16} />
      </button>

      <button className="month-picker-today" onClick={onToday}>
        This month
      </button>
    </div>
  );
};

export { MonthPicker };
