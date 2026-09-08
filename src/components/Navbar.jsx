import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from '../context/AuthContext';
import CommandPalette from './CommandPalette';

const links = [
  { to: '/', label: 'ABOUT', end: true },
  { to: '/blog', label: 'BLOG' },
  { to: '/research', label: 'RESEARCH' },
  { to: '/experience', label: 'EXPERIENCE' },
  { to: '/repositories', label: 'REPOSITORIES' },
  { to: '/cv', label: 'CV' },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="topbar">
      <nav className="nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
        {user ? (
          <>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>DASHBOARD</NavLink>
            <button className="link-btn" style={{ color: 'red' }} onClick={handleLogout}>LOGOUT</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>LOGIN</NavLink>
        )}
      </nav>
      <div className="topbar-actions">
        <CommandPalette />
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme">
          {theme === 'dark' ? '☾' : '☀'}
        </button>
      </div>
    </header>
  );
}