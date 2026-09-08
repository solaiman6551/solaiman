import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { api } from '../api/client';

export default function PostsSection() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | slug string
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [existingCover, setExistingCover] = useState(null);
  const [busy, setBusy] = useState(false);

  function load() {
    api.get('/posts/?mine=true')
      .then((res) => setPosts(res.data))
      .catch(() => setError('Could not load posts.'));
  }
  useEffect(load, []);

  function startNew() {
    setTitle(''); setContent(''); setPublished(false); setCoverFile(null); setExistingCover(null);
    setError('');
    setEditing('new');
  }

  function startEdit(post) {
    setTitle(post.title); setContent(post.content); setPublished(post.published);
    setExistingCover(post.cover_image); setCoverFile(null);
    setError('');
    setEditing(post.slug);
  }

  function cancelEdit() { 
    setEditing(null); 
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      if (coverFile) {
        // Option A: File uploaded -> Must use FormData
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);
        // Explicitly stringify boolean or convert to 1/0 for DRF compatibility
        form.append('published', published ? 'true' : 'false');
        form.append('cover_image', coverFile);

        const config = {
          headers: { 'Content-Type': 'multipart/form-data' },
        };

        if (editing === 'new') {
          await api.post('/posts/', form, config);
        } else {
          // DRF struggle with PATCH + multipart -> POST with override or standard PATCH
          await api.patch(`/posts/${editing}/`, form, config);
        }
      } else {
        // Option B: No new image file selected -> Send clean JSON payload
        const payload = {
          title,
          content,
          published,
        };

        if (editing === 'new') {
          await api.post('/posts/', payload);
        } else {
          await api.patch(`/posts/${editing}/`, payload);
        }
      }

      cancelEdit();
      load();
    } catch (err) {
      // Print exact Django validation response to Console for debugging
      if (err.response?.data) {
        console.error('Django Validation Errors:', err.response.data);
        const detailedError = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
          .join(' | ');
        setError(`Save failed — ${detailedError}`);
      } else {
        setError('Could not save the post.');
      }
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(post) {
    try {
      await api.patch(`/posts/${post.slug}/`, { published: !post.published });
      load();
    } catch {
      setError('Could not update status.');
    }
  }

  async function remove(post) {
    if (!confirm(`Delete "${post.title}"?`)) return;
    try {
      await api.delete(`/posts/${post.slug}/`);
      load();
    } catch {
      setError('Could not delete post.');
    }
  }

  return (
    <section className="dash-section">
      <div className="dash-section-header">
        <h2>Blog posts</h2>
        {editing === null && <button className="btn" onClick={startNew}>New post</button>}
      </div>

      {error && <p className="error">{error}</p>}

      {editing !== null && (
        <form className="form dash-form editor-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="post-title">Title</label>
            <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="post-cover">Cover image {existingCover && '(leave empty to keep current)'}</label>
            {existingCover && <img src={existingCover} alt="" className="cover-preview" />}
            <input id="post-cover" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0] || null)} />
          </div>
          <div>
            <label htmlFor="post-content">Content (Markdown)</label>
            <div className="editor-split">
              <textarea id="post-content" rows={12} value={content} onChange={(e) => setContent(e.target.value)} required />
              <div className="markdown-body preview">
                <ReactMarkdown>{content || '*Preview*'}</ReactMarkdown>
              </div>
            </div>
          </div>
          <label className="checkbox-row">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>
          <div className="dash-form-actions">
            <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
            <button type="button" className="link-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}

      {!posts && !error && <p className="page-loading">Loading…</p>}
      <ul className="dash-list">
        {posts?.map((post) => (
          <li key={post.id}>
            <span>{post.title}{!post.published && <span className="badge">Draft</span>}</span>
            <span className="row-actions">
              <button className="link-btn" onClick={() => startEdit(post)}>Edit</button>
              <button className="link-btn" onClick={() => togglePublish(post)}>{post.published ? 'Unpublish' : 'Publish'}</button>
              <button className="link-btn danger" onClick={() => remove(post)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}