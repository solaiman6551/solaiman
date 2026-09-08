import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/site';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="page">
        <p>Post not found.</p>
        <Link to="/blog">← Back to blog</Link>
      </main>
    );
  }

  return (
    <main className="page post-detail">
      <h1>{post.title}</h1>
      <p className="post-date">{new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}</p>
      <div className="markdown-body">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link to="/blog">← Back to blog</Link>
    </main>
  );
}
