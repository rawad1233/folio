import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FormField } from '../FormField/FormField';
import type { AddCategoryFormProps } from './AddCategoryForm.types';
import './AddCategoryForm.css';

const AddCategoryForm = ({ presetColors, onAdd }: AddCategoryFormProps) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(presetColors[0]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
      setError('Please enter a name.');
      return;
    }

    onAdd({
      name: name.trim(),
      color: selectedColor,
    });

    setName('');
    setSelectedColor(presetColors[0]);
    setError('');
  };

  return (
    <div className="category-form">
      <h2 className="category-form-title">Add category</h2>

      <div className="category-form-row">
        <FormField
          label="Name"
          placeholder="e.g. Travel"
          value={name}
          onChange={setName}
        />
        <button className="category-form-submit" onClick={handleSubmit}>
          <Plus size={16} />
          Add category
        </button>
      </div>

      <div className="category-form-colors">
        <span className="category-form-label">Color</span>
        <div className="category-form-swatches">
          {presetColors.map((color) => (
            <button
              key={color}
              className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      {error && <p className="category-form-error">{error}</p>}
    </div>
  );
};

export { AddCategoryForm };
