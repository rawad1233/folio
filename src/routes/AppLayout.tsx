import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/ui/SideBar/SideBar';
import { useAppDispatch } from '../store/hooks';
import { useAuth } from '../features/auth/AuthContext';
import { fetchCategories, resetCategories } from '../store/categoriesSlice';
import { fetchExpenses, resetExpenses } from '../store/expensesSlice';
import { fetchBudgets, resetBudgets } from '../store/budgetsSlice';

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchExpenses());
    dispatch(fetchBudgets());

    return () => {
      dispatch(resetCategories());
      dispatch(resetExpenses());
      dispatch(resetBudgets());
    };
  }, [dispatch, user?.id]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export { AppLayout };
