import { Link } from 'react-router-dom';
import { posts } from '../data/site';

export default function Blog() {
  return (
    <main className="page">
      <h1>blog</h1>
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`}>
              <h3>{p.title}</h3>
              <p className="post-date">{new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}</p>
              <p className="muted">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="muted note">
        Posts are static for now. Once the Django backend is live, this list
        (and the ability to write new posts from a dashboard) will be dynamic.
      </p>
    </main>
  );
}
