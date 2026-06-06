import { useMemo, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './Resources.css';

const SUMMARY_STATS = [
  {
    id: 'total',
    label: 'Total Resource',
    value: '106 Resources',
    icon: 'emoji_events',
  },
  {
    id: 'most-downloaded',
    label: 'Most Downloaded',
    value: 'General Maths by J.N Green',
    icon: 'star',
  },
  {
    id: 'newly-added',
    label: 'Newly Added',
    value: 'Dynamics of Programming Lan...',
    icon: 'post_add',
  },
  {
    id: 'quiz',
    label: 'Quiz Available',
    value: 'Take 5 Practice Quizzes Now',
    icon: 'quiz',
  },
];

const FILTER_TAGS = [
  { id: 'all', label: 'All' },
  { id: 'pinned', label: 'Pinned' },
  { id: 'pdf', label: 'PDF' },
  { id: 'video', label: 'Video' },
  { id: 'newly-uploaded', label: 'Newly Uploaded' },
  { id: 'past-questions', label: 'Past Questions' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'lecture-slides', label: 'Lecture Slides' },
  { id: 'assignment-solutions', label: 'Assignment Solutions' },
];

const RESOURCE_ITEMS = [
  {
    id: 'res-1',
    title: 'Introduction to Algebra SSS 1',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'newly-uploaded'],
    pinned: false,
  },
  {
    id: 'res-2',
    title: 'Further Maths Formulas',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'past-questions'],
    pinned: true,
  },
  {
    id: 'res-3',
    title: 'Principles of Chemistry',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'lecture-slides'],
    pinned: false,
  },
  {
    id: 'res-4',
    title: 'Organic Chemistry II',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf'],
    pinned: false,
  },
  {
    id: 'res-5',
    title: 'Introduction to Algebra SSS 1',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'quiz'],
    pinned: false,
  },
  {
    id: 'res-6',
    title: 'Further Maths Formulas',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'assignment-solutions'],
    pinned: true,
  },
  {
    id: 'res-7',
    title: 'Principles of Chemistry',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'video'],
    pinned: false,
  },
  {
    id: 'res-8',
    title: 'Organic Chemistry II',
    author: 'J.N Greene',
    subject: 'Mathematics',
    uploaded: '02/02/25',
    format: 'PDF',
    rating: 24,
    tags: ['pdf', 'newly-uploaded'],
    pinned: false,
  },
];

const TOTAL_AVAILABLE = 106;

function matchesFilter(item, filterId) {
  if (filterId === 'all') return true;
  if (filterId === 'pinned') return item.pinned;
  if (filterId === 'pdf') return item.format.toLowerCase() === 'pdf';
  if (filterId === 'video') return item.tags.includes('video');
  return item.tags.includes(filterId);
}

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [pinnedIds, setPinnedIds] = useState(() =>
    RESOURCE_ITEMS.filter((item) => item.pinned).map((item) => item.id)
  );

  const visibleItems = useMemo(() => {
    return RESOURCE_ITEMS.filter((item) => {
      const isPinned = pinnedIds.includes(item.id);
      const filterItem = { ...item, pinned: isPinned };
      return matchesFilter(filterItem, activeFilter);
    });
  }, [activeFilter, pinnedIds]);

  const togglePin = (id) => {
    setPinnedIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Resources">
          <section className="dashboard__title-row" aria-label="Page title">
            <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
              folder
            </span>
            <h1 className="dashboard__title">Resources</h1>
          </section>

          <div className="resources">
            <div className="resources__summary-grid">
              {SUMMARY_STATS.map((stat) => (
                <article key={stat.id} className="resources__summary-card">
                  <span className="resources__summary-icon material-symbols-outlined" aria-hidden>
                    {stat.icon}
                  </span>
                  <div className="resources__summary-text">
                    <p className="resources__summary-label">{stat.label}</p>
                    <p className="resources__summary-value">{stat.value}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="resources__filters" role="tablist" aria-label="Resource filters">
              {FILTER_TAGS.map((tag) => {
                const isActive = activeFilter === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`resources__filter-chip${isActive ? ' resources__filter-chip--active' : ''}`}
                    onClick={() => setActiveFilter(tag.id)}
                  >
                    <span>{tag.label}</span>
                    <span className="material-symbols-outlined" aria-hidden>
                      add
                    </span>
                  </button>
                );
              })}
            </div>

            <ul className="resources__grid">
              {visibleItems.map((item) => {
                const isPinned = pinnedIds.includes(item.id);
                return (
                  <li key={item.id}>
                    <article className="resources__card">
                      <div className="resources__card-media">
                        <div className="resources__card-placeholder" aria-hidden>
                          <span className="resources__placeholder-circle" />
                          <span className="resources__placeholder-triangle" />
                        </div>
                        <span className="resources__rating-badge">
                          <span className="material-symbols-outlined" aria-hidden>
                            star
                          </span>
                          {item.rating}
                        </span>
                        <span className="resources__format-badge">{item.format}</span>
                      </div>

                      <div className="resources__card-body">
                        <h2 className="resources__card-title">{item.title}</h2>
                        <p className="resources__card-author">{item.author}</p>
                        <p className="resources__card-meta">
                          {item.subject} / Uploaded Date : {item.uploaded}
                        </p>

                        <div className="resources__card-actions">
                          <button
                            type="button"
                            className={`resources__icon-btn${isPinned ? ' resources__icon-btn--active' : ''}`}
                            aria-label={isPinned ? 'Unpin resource' : 'Pin resource'}
                            aria-pressed={isPinned}
                            onClick={() => togglePin(item.id)}
                          >
                            <span className="material-symbols-outlined" aria-hidden>
                              push_pin
                            </span>
                          </button>
                          <button type="button" className="resources__icon-btn" aria-label="Open resource">
                            <span className="material-symbols-outlined" aria-hidden>
                              open_in_full
                            </span>
                          </button>
                          <button type="button" className="resources__download-btn">
                            <span className="material-symbols-outlined" aria-hidden>
                              download
                            </span>
                            Download
                          </button>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <p className="resources__available-count">{TOTAL_AVAILABLE} Available</p>
          </div>
        </main>
      </div>
    </div>
  );
}
