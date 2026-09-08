import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { api } from '../api/client';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/posts/${slug}/`).then((res) => setPost(res.data)).catch(() => setError('Post not found.'));
  }, [slug]);

  if (error) return <main className="page"><p className="error">{error}</p><Link to="/blog">← Back to blog</Link></main>;
  if (!post) return <main className="page"><p className="page-loading">Loading…</p></main>;

  return (
    <main className="page post-detail">
      {post.cover_image && <img src={post.cover_image} alt="" className="post-detail-img" />}
      {!post.published && <span className="badge">Draft — not public yet</span>}
      <h1>{post.title}</h1>
      <p className="post-date">{new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })} · {post.author_username}</p>
      <div className="markdown-body">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link to="/blog">← Back to blog</Link>
    </main>
  );
}