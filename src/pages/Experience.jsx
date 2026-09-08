import { experience } from '../data/site';

function renderBullet(text) {
  // splits on **bold** markers and wraps them in <strong>
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function Experience() {
  return (
    <main className="page">
      <h1>Work Experience</h1>
      <ul className="exp-timeline">
        {experience.map((e, i) => (
          <li key={i} className="exp-item">
            <p className="exp-period">{e.period}</p>
            <h2 className="exp-org">{e.org}</h2>
            <p className="exp-role">{e.role}</p>
            <ul className="exp-bullets">
              {e.bullets.map((b, j) => (
                <li key={j}>{renderBullet(b)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}