import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const PublicOnlyRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Loading…</div>;
  }
  if (session) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export { PublicOnlyRoute };
