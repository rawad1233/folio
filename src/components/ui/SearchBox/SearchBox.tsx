import { Search } from 'lucide-react';
import type { SearchBoxProps } from './SearchBox.types';
import './SearchBox.css';

const SearchBox = ({ value, placeholder = 'Search', onChange }: SearchBoxProps) => {
  return (
    <div className="search-box">
      <Search size={14} className="search-box-icon" />
      <input
        className="search-box-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export { SearchBox };
