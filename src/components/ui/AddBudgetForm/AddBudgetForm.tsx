import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormField } from '../FormField/FormField';
import { Select } from '../Select/Select';
import type { SelectOption } from '../Select/Select.types';
import type { AddBudgetFormProps } from './AddBudgetForm.types';
import './AddBudgetForm.css';

const currentMonthString = () => {
  return new Date().toISOString().slice(0, 7);   // "2026-07"
};

const AddBudgetForm = ({ categories, onAdd }: AddBudgetFormProps) => {
  const [categoryId, setCategoryId] = useState('');
  const [limit, setLimit] = useState('');
  const [month, setMonth] = useState(currentMonthString());
  const [error, setError] = useState('');

  const categorySelectOptions: SelectOption[] = [
    { value: '', label: 'Select...' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const handleSubmit = () => {
    if (categoryId === '') {
      setError('Please select a category.');
      return;
    }
    if (limit === '' || Number(limit) <= 0) {
      setError('Please enter a limit greater than 0.');
      return;
    }

    onAdd({
      categoryId: categoryId,
      limit: Number(limit),
      month: month,
    });

    setCategoryId('');
    setLimit('');
    setMonth(currentMonthString());
    setError('');
  };

  return (
    <div className="budget-form">
      <h2 className="budget-form-title">Add budget</h2>

      <div className="budget-form-row">
        <div className="budget-form-field">
          <label className="budget-form-label">Category</label>
          <Select
            value={categoryId}
            options={categorySelectOptions}
            onChange={setCategoryId}
          />
        </div>
        <FormField
          label="Monthly limit"
          type="number"
          placeholder="0.00"
          value={limit}
          onChange={setLimit}
        />
        <FormField
          label="Month"
          type="month"
          value={month}
          onChange={setMonth}
        />
        <button className="budget-form-submit" onClick={handleSubmit}>
          <Plus size={16} />
          Add budget
        </button>
      </div>

      {error && <p className="budget-form-error">{error}</p>}
    </div>
  );
};

export { AddBudgetForm };
