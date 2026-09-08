import { research } from '../data/site';

export default function Research() {
  return (
    <main className="page">
      <h1>Research</h1>

      <section className="research-exp">
        <div className="research-exp-entry">
          <div className="research-exp-header">
            <div>
              <p className="research-exp-org">Pervasive & Cloud Computing Lab (PC2L) of Dr Mahfuzur Rahman</p>
              <p className="research-exp-role">Research Assistant (Part-time)</p>
            </div>
            <p className="research-exp-period">Aug 2018 – Mar 2024</p>
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
          {research.map((p, i) => (
            <li key={i}>
              <p className="pub-title">{p.title}</p>
              <p className="muted">{p.authors}</p>
              <p className="pub-venue">{p.venue} · {p.year}</p>
              <div className="pub-links">
                <a href={p.links.doi}>DOI</a>
                <a href={p.links.pdf}>PDF</a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}