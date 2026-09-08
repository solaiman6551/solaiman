import { useEffect, useState } from 'react';
import { api } from '../api/client';

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'role', label: 'Role' },
  { name: 'location', label: 'Location' },
  { name: 'coords', label: 'Coordinates tagline' },
  { name: 'bio', label: 'Bio', textarea: true },
  { name: 'github', label: 'GitHub URL' },
  { name: 'linkedin', label: 'LinkedIn URL' },
  { name: 'google_scholar', label: 'Google Scholar' },
  { name: 'email', label: 'Email' },
];

export default function ProfileEditor() {
  const [form, setForm] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get('/profile/').then((res) => setForm(res.data)).catch(() => setForm({}));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    const data = new FormData();
    fields.forEach((f) => data.append(f.name, form[f.name] || ''));
    if (avatarFile) data.append('avatar', avatarFile);
    try {
      await api.patch('/profile/', data);
      setStatus('Saved.');
    } catch {
      setStatus('Could not save.');
    } finally {
      setBusy(false);
    }
  }

  if (!form) return <p className="page-loading">Loading…</p>;

  return (
    <section className="dash-section">
      <h2>Profile</h2>
      <form className="form dash-form" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            {f.textarea ? (
              <textarea
                id={f.name}
                rows={4}
                value={form[f.name] || ''}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
              />
            ) : (
              <input
                id={f.name}
                value={form[f.name] || ''}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
              />
            )}
          </div>
        ))}
        <div>
          <label htmlFor="avatar">Avatar {form.avatar && '(leave empty to keep current)'}</label>
          <input id="avatar" type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0] || null)} />
        </div>
        {status && <p className="muted">{status}</p>}
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save profile'}</button>
      </form>
    </section>
  );
}