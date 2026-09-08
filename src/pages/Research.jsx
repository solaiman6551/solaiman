import { useEffect, useState } from 'react';
import { researchInterests } from '../data/site';
import { api } from '../api/client';

export default function Research() {
  const [research, setResearch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/research/').then((res) => setResearch(res.data)).catch(() => setError('Could not load research.'));
  }, []);

  if (error) return <main className="page"><p className="error">{error}</p></main>;
  if (!research) return <main className="page"><p className="page-loading">Loading…</p></main>;

  return (
    <main className="page">
      <section className="research-interests">
        <h2>Research Interests</h2>
        <div className="interests-tags">
          {researchInterests.map((topic, index) => (
            <span key={index} className="interest-tag">
              {topic}
            </span>
          ))}
        </div>
      </section>


      <section className="research-exp">
        <h2>Research Experience</h2>
        <div className="research-exp-entry">
          <div className="research-exp-header">
            <div>
              <p className="research-exp-org">Pervasive & Cloud Computing Lab (PC2L)</p>
              <p className="research-exp-role">Research Assistant (Part-time)</p>
            </div>
            <p className="research-exp-period">August 2018 – March 2024</p>
          </div>
          <ul className="research-exp-bullets">
            <li>Focused on machine learning models, data processing techniques, uncertainty reduction, and interdisciplinary AI applications.</li>
            <li>Applied Logistic Regression, LDA, Decision Tree, and Naive Bayes classifiers; led SHAP analysis for feature interpretation.</li>
            <li>Funded by King Fahd University of Petroleum & Minerals — Interdisciplinary Research Center for Intelligent Secure Systems (IRC-ISS).</li>
          </ul>
        </div>
      </section>

      <section className="publications-list">
        <h2>Publications</h2>
        <ul className="pub-list">
          {research.map((p) => (
            <li key={p.id}>
              <p className="pub-title">{p.title}</p>
              <p className="muted">{p.authors}</p>
              <p className="pub-venue">{p.venue} · {p.year}</p>
              <div className="pub-links">
                {p.doi_url && <a href={p.doi_url}>DOI</a>}
                {p.pdf_url && <a href={p.pdf_url}>PDF</a>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}