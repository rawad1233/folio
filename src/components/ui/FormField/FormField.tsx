import type { FormFieldProps } from './FormField.types';
import './FormField.css';

const FormField = ({
  label, optional, type = 'text', placeholder, value, onChange,
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label className="form-field-label">
        {label}
        {optional && <span className="form-field-optional"> (optional)</span>}
      </label>
      <input
        className="form-field-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export { FormField };
