import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { education } from '../data/site'; // education isn't dynamic yet — still static

export default function About() {
  const [profile, setProfile] = useState(null);
  const [news, setNews] = useState(null);
  const [experience, setExperience] = useState(null);
  const [research, setResearch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.get('/profile/'),
      api.get('/news/'),
      api.get('/experience/'),
      api.get('/research/'),
    ])
      .then(([p, n, e, r]) => {
        setProfile(p.data);
        setNews(n.data);
        setExperience(e.data);
        setResearch(r.data);
      })
      .catch(() => setError('Could not load site content. Is the backend running?'));
  }, []);

  if (error) return <main className="page"><p className="error">{error}</p></main>;
  if (!profile) return <main className="page"><p className="page-loading">Loading…</p></main>;

  return (
    <main className="page">
      <section className="about-hero">
        <div className="about-text">
          <p className="coords">{profile.coords} — {profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="bio">{profile.bio}</p>
          <div className="social-row">
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile.google_scholar && <a href={profile.google_scholar} target="_blank" rel="noreferrer">Google Scholar</a>}
            {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
          </div>
        </div>
        <figure className="avatar-figure">
          <img src={profile.avatar || '/avatar.png'} alt={profile.name} className="avatar-placeholder" />
          <figcaption>{profile.role}</figcaption>
        </figure>
      </section>

      <section className="about-columns">
        <div className="timeline-col">
          <h2>Work Experience</h2>
          <ul className="timeline">
            {experience.map((e) => (
              <li key={e.id}>
                <Link to="/experience" className="timeline-link">
                  <p className="timeline-period">{e.period}</p>
                  <p className="timeline-title">{e.role}</p>
                  <p className="timeline-org">{e.org}</p>
                  <p className="timeline-desc clamp-3">{e.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="timeline-col">
          <h2>Research</h2>
          <ul className="timeline">
            <li>
              <Link to="/research" className="timeline-link">
                <p className="timeline-period">October 2018 — August 2024</p>
                <p className="timeline-title">Research Assistant (Part Time)</p>
                <p className="timeline-org">PC2L Research Lab</p>
                <p className="timeline-desc">
                  Machine learning research spanning interpretable ML, energy
                  trading, and healthcare systems — four peer-reviewed papers
                  in IEEE and Scopus-indexed venues. Click to ee the full list on the
                  Publications page.
                </p>
              </Link>
            </li>
          </ul>

          <h2>Education</h2>
          <ul className="timeline">
            {education.map((ed, i) => (
              <li key={i}>
                <p className="timeline-period">{ed.period}</p>
                <p className="timeline-title">{ed.degree}</p>
                <p className="timeline-org">{ed.org}</p>
                {ed.description && <p className="timeline-desc">{ed.description}</p>}
              </li>
            ))}
          </ul>
        </div>

        <aside className="news-sidebar">
          <h2>News</h2>
          <ul className="news-feed">
            {news.map((n) => (
              <li key={n.id}>
                <span className="news-dot" aria-hidden="true" />
                <div>
                  <span className="news-feed-text">{n.text}</span>
                  <span className="news-feed-date">
                    {new Date(n.date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}