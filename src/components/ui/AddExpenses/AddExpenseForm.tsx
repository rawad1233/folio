import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormField } from '../FormField/FormField';
import { Select } from '../Select/Select';
import type { SelectOption } from '../Select/Select.types';
import type { AddExpenseFormProps } from './AddExpenseForm.types';
import './AddExpenseForm.css';

const todayString = () => {
  return new Date().toISOString().split('T')[0];
};

const AddExpenseForm = ({ categories, onAdd }: AddExpenseFormProps) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayString());
  const [categoryId, setCategoryId] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const categorySelectOptions: SelectOption[] = [
    { value: '', label: 'Select...' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const handleSubmit = () => {
    if (title.trim() === '') {
      setError('Please enter a title.');
      return;
    }
    if (amount === '' || Number(amount) <= 0) {
      setError('Please enter an amount greater than 0.');
      return;
    }
    if (categoryId === '') {
      setError('Please select a category.');
      return;
    }

    onAdd({
      title: title.trim(),
      amount: Number(amount),
      date: date,
      categoryId: categoryId,
      note: note.trim() === '' ? undefined : note.trim(),
    });

    setTitle('');
    setAmount('');
    setDate(todayString());
    setCategoryId('');
    setNote('');
    setError('');
  };

  return (
    <div className="expense-form">
      <h2 className="expense-form-title">Add expense</h2>

      <div className="expense-form-row">
        <FormField
          label="Title"
          placeholder="e.g. Groceries"
          value={title}
          onChange={setTitle}
        />
        <FormField
          label="Amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={setAmount}
        />
        <FormField
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
        />
        <div className="expense-form-field">
          <label className="expense-form-label">Category</label>
          <Select
            value={categoryId}
            options={categorySelectOptions}
            onChange={setCategoryId}
          />
        </div>
      </div>

      <div className="expense-form-bottom">
        <FormField
          label="Notes"
          optional
          placeholder="Add a note"
          value={note}
          onChange={setNote}
        />
        <button className="expense-form-submit" onClick={handleSubmit}>
          <Plus size={16} />
          Add expense
        </button>
      </div>

      {error && <p className="expense-form-error">{error}</p>}
    </div>
  );
};

export { AddExpenseForm };
