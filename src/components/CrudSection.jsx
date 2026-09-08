import { useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * Generic list+form CRUD block used for News, Experience, Research, and
 * Projects in the dashboard — they all share the same shape (a flat list
 * of author-owned records with a `published` flag). Posts and Profile are
 * special enough (image upload, markdown, singleton) to have their own
 * dedicated components instead of using this one.
 *
 * fields: [{ name, label, type: 'text' | 'textarea' | 'number' | 'date' }]
 * previewField: which field's value to show as each list item's title
 */
export default function CrudSection({ title, endpoint, fields, previewField }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | item object
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);

  function load() {
    api
      .get(`${endpoint}?mine=true`)
      .then((res) => setItems(res.data))
      .catch(() => setError(`Could not load ${title.toLowerCase()}.`));
  }

  useEffect(load, [endpoint]);

  function startNew() {
    const blank = {};
    fields.forEach((f) => { blank[f.name] = f.type === 'number' ? 0 : ''; });
    setForm(blank);
    setEditing('new');
  }

  function startEdit(item) {
    setForm(item);
    setEditing(item.id);
  }

  function cancelEdit() {
    setEditing(null);
    setForm({});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing === 'new') {
        await api.post(endpoint, form);
      } else {
        await api.patch(`${endpoint}${editing}/`, form);
      }
      cancelEdit();
      load();
    } catch {
      setError('Could not save — check the fields and try again.');
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(item) {
    await api.patch(`${endpoint}${item.id}/`, { published: !item.published });
    load();
  }

  async function remove(item) {
    if (!confirm('Delete this entry? This can\'t be undone.')) return;
    await api.delete(`${endpoint}${item.id}/`);
    load();
  }

  return (
    <section className="dash-section">
      <div className="dash-section-header">
        <h2>{title}</h2>
        {editing === null && <button className="btn" onClick={startNew}>Add new</button>}
      </div>

      {error && <p className="error">{error}</p>}

      {editing !== null && (
        <form className="form dash-form" onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name}>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  id={f.name}
                  rows={4}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              ) : (
                <input
                  id={f.name}
                  type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                />
              )}
            </div>
          ))}
          <div className="dash-form-actions">
            <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
            <button type="button" className="link-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}

      {!items && !error && <p className="page-loading">Loading…</p>}
      {items && items.length === 0 && editing === null && <p className="muted">Nothing here yet.</p>}

      <ul className="dash-list">
        {items?.map((item) => (
          <li key={item.id}>
            <span>
              {item[previewField] || '(untitled)'}
              {!item.published && <span className="badge">Draft</span>}
            </span>
            <span className="row-actions">
              <button className="link-btn" onClick={() => startEdit(item)}>Edit</button>
              <button className="link-btn" onClick={() => togglePublish(item)}>
                {item.published ? 'Unpublish' : 'Publish'}
              </button>
              <button className="link-btn danger" onClick={() => remove(item)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}