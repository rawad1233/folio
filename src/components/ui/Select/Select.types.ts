export interface SelectOption {
  value: string;   // what the code receives ('c2', 'high')
  label: string;   // what the human reads ('Groceries', 'High to low')
}

export interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}
