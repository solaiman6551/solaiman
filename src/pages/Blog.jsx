import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

export default function Blog() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/posts/').then((res) => setPosts(res.data)).catch(() => setError('Could not load posts. Is the backend running?'));
  }, []);

  return (
    <main className="page">
      <h1>blog</h1>
      {error && <p className="error">{error}</p>}
      {!posts && !error && <p className="page-loading">Loading…</p>}
      {posts && posts.length === 0 && <p className="muted">No posts published yet.</p>}
      <ul className="post-list">
        {posts?.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.slug}`}>
              <h3>{p.title}</h3>
              <p className="post-date">{new Date(p.created_at).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}