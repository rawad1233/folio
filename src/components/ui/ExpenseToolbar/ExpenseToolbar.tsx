import { SearchBox } from '../SearchBox/SearchBox';
import { Select } from '../Select/Select';
import type { SelectOption } from '../Select/Select.types';
import type { ExpenseToolbarProps, SortOption } from './ExpenseToolbar.types';
import './ExpenseToolbar.css';

const sortOptions: SelectOption[] = [
  { value: 'default', label: 'Default' },
  { value: 'newest',  label: 'Newest first' },
  { value: 'oldest',  label: 'Oldest first' },
  { value: 'high',    label: 'High to low' },
  { value: 'low',     label: 'Low to high' },
];

const ExpenseToolbar = ({
  search, categoryId, sort, categories,
  onSearchChange, onCategoryChange, onSortChange,
}: ExpenseToolbarProps) => {
  const categorySelectOptions: SelectOption[] = [
    { value: '', label: 'All categories' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <div className="expense-toolbar">
      <SearchBox value={search} onChange={onSearchChange} />
      <Select
        value={categoryId}
        options={categorySelectOptions}
        onChange={onCategoryChange}
      />
      <Select
        value={sort}
        options={sortOptions}
        onChange={(v) => onSortChange(v as SortOption)}
      />
    </div>
  );
};

export { ExpenseToolbar };
