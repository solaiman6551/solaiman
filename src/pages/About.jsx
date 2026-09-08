import { profile, news, experience, research, education } from '../data/site';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="page">
      <section className="about-hero">
        <div className="about-text">
          <p className="coords">{profile.coords} — {profile.location}</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="bio">{profile.bio}</p>
          <div className="social-row">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.email}>Email</a>
          </div>
        </div>
        <figure className="avatar-figure">
          <img src="/avatar.png" alt={profile.name} className="avatar-placeholder" />
          <figcaption>{profile.role}</figcaption>
        </figure>
      </section>

      <section className="about-columns">
        <div className="timeline-col">
          <h2>Work Experience</h2>
          <ul className="timeline">
            {experience.map((e, i) => (
              <li key={i}>
                <Link to="/experience" className="timeline-link">
                  <p className="timeline-period">{e.period}</p>
                  <p className="timeline-title">{e.role}</p>
                  <p className="timeline-org">{e.org}</p>
                  <p className="timeline-desc">{e.description}</p>
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
                <p className="timeline-period">Oct 2018 — Aug 2024</p>
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

          <h2 style={{ marginTop: '2.5rem' }}>Education</h2>
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
          <h2>news</h2>
          <ul className="news-feed">
            {news.map((n) => (
              <li key={n.date}>
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