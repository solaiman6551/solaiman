import { useEffect, useState } from 'react';
import { renderBullet } from '../utils/renderBullet';
import { api } from '../api/client';


export default function Experience() {
  const [experience, setExperience] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/experience/').then((res) => setExperience(res.data)).catch(() => setError('Could not load experience.'));
  }, []);

  if (error) return <main className="page"><p className="error">{error}</p></main>;
  if (!experience) return <main className="page"><p className="page-loading">Loading…</p></main>;

  return (
    <main className="page">
      <h1>Experience</h1>
      <ul className="exp-timeline">
        {experience.map((e) => (
          <li key={e.id} className="exp-item">
            <p className="exp-period">{e.period}</p>
            <h2 className="exp-org">{e.org}</h2>
            <p className="exp-role">{e.role}</p>
            {e.description && (
              <ul className="exp-bullets">
                {e.description.split('\n').filter(Boolean).map((line, j) => (
                  <li key={j}>{renderBullet(line)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}