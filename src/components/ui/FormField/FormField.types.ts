export interface FormFieldProps {
  label: string;
  optional?: boolean;
  type?: string;              // 'text' | 'number' | 'date' | 'month'
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}
