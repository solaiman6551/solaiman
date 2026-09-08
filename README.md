# solaiman6551.github.io — static React frontend

This is a fresh static React (Vite) site in the al-folio-inspired style:
about / blog / research / experience / repositories / CV, a Cmd+K search
palette, and a dark/light toggle. No backend yet — the blog posts and news
items are hardcoded in `src/data/site.js`. In a couple of days, I'll swap that
static data for `fetch()` calls to the Django API from the earlier build,
and add a `/login` + `/dashboard` route the same way.


Once the Django backend is ready, I will also set up a GitHub Actions
workflow so this becomes fully automatic on every push — same pattern as
before, just targeting `main` at the repo root instead of a `gh-pages`
branch and `/repo-name/` sub-path.
