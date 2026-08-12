import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, List, Clock, Tag, LogOut } from 'lucide-react';
import type { NavItem } from './SideBar.types';
import { useAuth } from '../../../features/auth/AuthContext';
import './SideBar.css';

const navItems: NavItem[] = [
  { label: 'Dashboard',  path: '/',           icon: LayoutGrid },
  { label: 'Expenses',   path: '/expenses',   icon: List },
  { label: 'Budgets',    path: '/budgets',    icon: Clock },
  { label: 'Categories', path: '/categories', icon: Tag },
];

const initialsFromEmail = (email: string) => {
  const name = email.split('@')[0];
  return name.slice(0, 2).toUpperCase();
};

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const email = user?.email ?? '';

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <div className="sidebar-logo-dot" />
        </div>
        <span className="sidebar-logo-text">Folio</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/'}
            className="sidebar-link"
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-profile">
        <div className="sidebar-profile-row">
          <div className="sidebar-avatar">{email ? initialsFromEmail(email) : '?'}</div>
          <div>
            <p className="sidebar-profile-email">{email}</p>
          </div>
        </div>
        <button className="sidebar-signout" onClick={handleSignOut}>
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export { Sidebar };
