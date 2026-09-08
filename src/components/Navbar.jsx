import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeContext';
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

  return (
    <header className="topbar">
      <nav className="nav">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
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
