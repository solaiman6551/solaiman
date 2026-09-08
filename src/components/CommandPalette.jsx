import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { posts, experience } from '../data/site';

const staticEntries = [
  { label: 'About', to: '/', kind: 'page' },
  { label: 'Blog', to: '/blog', kind: 'page' },
  { label: 'Research', to: '/research', kind: 'page' },
  { label: 'Experience', to: '/experience', kind: 'page' },
  { label: 'Repositories', to: '/repositories', kind: 'page' },
  { label: 'CV', to: '/cv', kind: 'page' },
];

const searchIndex = [
  ...staticEntries,
  ...posts.map((p) => ({ label: p.title, to: `/blog/${p.slug}`, kind: 'post' })),
  ...experience.map((p) => ({ label: `${p.role} — ${p.org}`, to: '/experience', kind: 'experience' })),
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(e) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staticEntries;
    return searchIndex.filter((e) => e.label.toLowerCase().includes(q));
  }, [query]);

  if (!open) {
    return (
      <button className="cmdk-trigger" onClick={() => setOpen(true)} aria-label="Open search (Cmd+K)">
        <span>Search</span>
      </button>
    );
  }

  function go(to) {
    setOpen(false);
    setQuery('');
    navigate(to);
  }

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          placeholder="Search pages, posts, experiences…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul>
          {results.length === 0 && <li className="cmdk-empty">No results.</li>}
          {results.map((r) => (
            <li key={r.to + r.label}>
              <button onClick={() => go(r.to)}>
                <span className="cmdk-kind">{r.kind}</span> {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
