import { useState } from 'react';
import CrudSection from '../components/CrudSection';
import ProfileEditor from '../components/ProfileEditor';
import PostsSection from '../components/PostsSection';

const tabs = ['Posts', 'Experience', 'Research', 'News', 'Profile'];

export default function Dashboard() {
  const [tab, setTab] = useState('Posts');

  return (
    <main className="page">
      <h1>Dashboard</h1>
      <div className="dash-tabs">
        {tabs.map((t) => (
          <button key={t} className={t === tab ? 'dash-tab active' : 'dash-tab'} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Posts' && <PostsSection />}

      {tab === 'Experience' && (
        <CrudSection
          title="Experience"
          endpoint="/experience/"
          previewField="org"
          fields={[
            { name: 'period', label: 'Period (e.g. "2021 — Present")' },
            { name: 'role', label: 'Role' },
            { name: 'org', label: 'Organization' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'sort_order', label: 'Sort order (lower = first)', type: 'number' },
          ]}
        />
      )}

      {tab === 'Research' && (
        <CrudSection
          title="Research"
          endpoint="/research/"
          previewField="title"
          fields={[
            { name: 'title', label: 'Title' },
            { name: 'venue', label: 'Venue' },
            { name: 'year', label: 'Year' },
            { name: 'authors', label: 'Authors' },
            { name: 'doi_url', label: 'DOI URL' },
            { name: 'pdf_url', label: 'PDF URL' },
            { name: 'sort_order', label: 'Sort order', type: 'number' },
          ]}
        />
      )}

      {tab === 'News' && (
        <CrudSection
          title="News"
          endpoint="/news/"
          previewField="text"
          fields={[
            { name: 'date', label: 'Date', type: 'date' },
            { name: 'text', label: 'Text' },
          ]}
        />
      )}

      {tab === 'Profile' && <ProfileEditor />}
    </main>
  );
}