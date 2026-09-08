import { useEffect, useState } from 'react';
import { profile } from '../data/site';

const username = profile.github.split('/').filter(Boolean).pop();

export default function Repositories() {
  const [repos, setRepos] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API request failed');
        return res.json();
      })
      .then(setRepos)
      .catch(() => setError('Could not load repositories from GitHub right now.'));
  }, []);

  return (
    <main className="page">
      <h1>Repositories</h1>
      {error && (
        <p className="error">
          {error} You can browse them directly on{' '}
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>.
        </p>
      )}
      {!repos && !error && <p className="muted">Loading…</p>}
      <ul className="repo-list">
        {repos?.map((r) => (
          <li key={r.id}>
            <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
            {r.description && <p className="muted">{r.description}</p>}
            <p className="repo-meta">
              {r.language && <span>{r.language}</span>}
              <span>★ {r.stargazers_count}</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
