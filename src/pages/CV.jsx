export default function CV() {
  return (
    <main className="page narrow">
      <h1>CV</h1>
      <p className="muted">
        Drop your CV PDF into <code>public/cv.pdf</code> and this button will link to it.
      </p>
      <a className="btn" href="/cv.pdf" target="_blank" rel="noreferrer">Download CV (PDF)</a>
    </main>
  );
}
