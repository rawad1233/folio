import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { ExpensesPage } from '../pages/Expenses/ExpensesPage';
import { BudgetsPage } from '../pages/Budgets/BudgetsPage';
import { CategoriesPage } from '../pages/Categories/CategoriesPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { SignupPage } from '../pages/Signup/SignupPage';
import { AppLayout } from './AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { AppRoutes };
