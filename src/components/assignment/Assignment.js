import { useEffect, useRef, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './Assignment.css';
import { SUBJECT_IMAGES } from '../../subjectImages';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'physics', label: 'Physics' },
  { id: 'ict', label: 'ICT' },
  { id: 'civic', label: 'Civic Education' },
  { id: 'english', label: 'English Language' },
];

const ASSIGNMENTS = [
  {
    id: 'math-1',
    subjectId: 'mathematics',
    subject: 'Mathematics',
    created: '12/01/25',
    due: '18/01/25',
    progress: 25,
    section: 'ongoing',
    image: SUBJECT_IMAGES.mathematics,
  },
  {
    id: 'chm-1',
    subjectId: 'chemistry',
    subject: 'Chemistry',
    created: '10/01/25',
    due: '20/01/25',
    progress: 45,
    section: 'ongoing',
    image: SUBJECT_IMAGES.chemistry,
  },
  {
    id: 'phy-1',
    subjectId: 'physics',
    subject: 'Physics',
    created: '14/01/25',
    due: '19/01/25',
    progress: 10,
    section: 'ongoing',
    image: SUBJECT_IMAGES.physics,
  },
  {
    id: 'ict-1',
    subjectId: 'ict',
    subject: 'ICT',
    created: '08/01/25',
    due: '22/01/25',
    progress: 60,
    section: 'ongoing',
    image: SUBJECT_IMAGES.ict,
  },
  {
    id: 'civic-1',
    subjectId: 'civic',
    subject: 'Civic Education',
    created: '15/01/25',
    due: '25/01/25',
    progress: 0,
    section: 'to-attempt',
    image: SUBJECT_IMAGES.civic,
  },
  {
    id: 'eng-1',
    subjectId: 'english',
    subject: 'English Language',
    created: '16/01/25',
    due: '26/01/25',
    progress: 0,
    section: 'to-attempt',
    image: SUBJECT_IMAGES.english,
  },
];

const SECTIONS = [
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'to-attempt', label: 'To Attempt' },
  { id: 'completed', label: 'Completed' },
];

function AssignmentCard({ item }) {
  return (
    <article className="assignments__card" aria-label={item.subject}>
      <div className="assignments__card-media">
        <img className="assignments__card-image" src={item.image} alt="" />
      </div>
      <div className="assignments__card-body">
        <div className="assignments__card-dates">
          <span>Created : {item.created}</span>
          <span>Due Date : {item.due}</span>
        </div>
        <h3 className="assignments__card-subject">{item.subject}</h3>
        <div className="assignments__card-progress">
          <span className="assignments__card-pct">{item.progress}%</span>
          <div className="assignments__card-progress-track" aria-hidden>
            <div className="assignments__card-progress-fill" style={{ width: `${item.progress}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Assignment() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterId, setFilterId] = useState('all');
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterOpen) return undefined;
    const onPointerDown = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setFilterOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [filterOpen]);

  const filterLabel = FILTER_OPTIONS.find((o) => o.id === filterId)?.label ?? 'All';

  const filtered = ASSIGNMENTS.filter(
    (item) => filterId === 'all' || item.subjectId === filterId
  );

  const bySection = (sectionId) => filtered.filter((item) => item.section === sectionId);

  const completedCount = bySection('completed').length;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Assignments">
          <section className="dashboard__title-row assignments__title-row" aria-label="Page title">
            <div className="assignments__title-start">
              <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
                assignment
              </span>
              <h1 className="dashboard__title">Assignment</h1>
            </div>
            <div className="dashboard__filter-pack" ref={filterRef}>
              <button
                type="button"
                className="dashboard__filter-trigger dashboard__filter-trigger--compact"
                aria-expanded={filterOpen}
                aria-haspopup="menu"
                onClick={() => setFilterOpen((open) => !open)}
              >
                {filterLabel}
                <span className="material-symbols-outlined" aria-hidden>
                  filter_list
                </span>
              </button>
              {filterOpen && (
                <ul className="dashboard__filter-menu" role="menu">
                  {FILTER_OPTIONS.map((opt) => (
                    <li key={opt.id} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        className={`dashboard__filter-option${opt.id === filterId ? ' dashboard__filter-option--active' : ''}`}
                        onClick={() => {
                          setFilterId(opt.id);
                          setFilterOpen(false);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <div className="assignments">
            {SECTIONS.map((section) => {
              const items = bySection(section.id);
              const count = section.id === 'completed' ? completedCount : items.length;

              return (
                <section
                  key={section.id}
                  className={`assignments__section${section.id === 'to-attempt' ? ' assignments__section--to-attempt' : ''}`}
                  aria-labelledby={`assignments-${section.id}-title`}
                >
                  <header className="assignments__section-head">
                    <h2 id={`assignments-${section.id}-title`} className="assignments__section-title">
                      {section.label}
                    </h2>
                    <span className="assignments__section-count" aria-label={`${count} items`}>
                      {count}
                    </span>
                  </header>

                  {items.length === 0 ? (
                    <p className="assignments__section-empty">
                      {section.id === 'completed'
                        ? 'No Completed Assignment yet'
                        : 'No assignments in this section.'}
                    </p>
                  ) : (
                    <ul className="assignments__grid">
                      {items.map((item) => (
                        <li key={item.id}>
                          <AssignmentCard item={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
