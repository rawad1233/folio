export interface NewCategory {
  name: string;
  color: string;
}

export interface AddCategoryFormProps {
  presetColors: string[];              // the swatches to offer
  onAdd: (category: NewCategory) => void;
}
