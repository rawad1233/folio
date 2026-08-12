import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Loading…</div>;
  }
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export { ProtectedRoute };
