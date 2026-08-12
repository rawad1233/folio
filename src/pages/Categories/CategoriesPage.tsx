import { useState } from 'react';
import { CategoryItem } from '../../components/ui/CategoryItem/CategoryItem';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog/ConfirmDialog';
import { AddCategoryForm } from '../../components/ui/AddCategoryForm/AddCategoryForm';
import type { NewCategory } from '../../components/ui/AddCategoryForm/AddCategoryForm.types';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addCategory, deleteCategory } from '../../store/categoriesSlice';
import { selectCategoriesWithCount } from '../../store/selectors';
import './CategoriesPage.css';

const presetColors: string[] = [
  '#10b981', '#f59e0b', '#3b82f6', '#a855f7', '#06b6d4',
  '#ef4444', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
];

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategoriesWithCount);
  const categoriesError = useAppSelector((state) => state.categories.error);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAdd = (newCategory: NewCategory) => {
    dispatch(addCategory({
      name: newCategory.name,
      color: newCategory.color,
    }));
  };

  const askDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteCategory(deleteId));
    }
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const categoryToDelete = categories.find((category) => category.id === deleteId);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        <p className="page-subtitle">Organize spending into color-coded groups.</p>
      </div>

      {categoriesError && <p className="page-error">{categoriesError}</p>}

      <AddCategoryForm presetColors={presetColors} onAdd={handleAdd} />

      <div className="categories-card">
        <p className="categories-card-count">{categories.length} categories</p>

        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            id={category.id}
            name={category.name}
            color={category.color}
            expenseCount={category.expenseCount}
            onDelete={askDelete}
          />
        ))}
      </div>

      {deleteId && categoryToDelete && (
        <ConfirmDialog
          title="Delete category?"
          message={`This will remove "${categoryToDelete.name}".`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export { CategoriesPage };
