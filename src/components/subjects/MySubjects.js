import { useEffect, useRef, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './MySubjects.css';

const IMG_CHALK = `${process.env.PUBLIC_URL}/images/resource-slide-chalkboard.png`;
const IMG_LAB = `${process.env.PUBLIC_URL}/images/resource-physics-banner.png`;

/** Ten subjects — order matches teacher list (same teacher name per reference). */
const MY_SUBJECTS = [
  { id: 'physics', title: 'Physics', classLabel: 'SS 1A', badge: 'core', image: IMG_CHALK },
  { id: 'chemistry', title: 'Chemistry', classLabel: 'SS 1A', badge: 'lab', image: IMG_LAB },
  { id: 'mathematics', title: 'Mathematics', classLabel: 'SS 1A', badge: 'core', image: IMG_CHALK },
  { id: 'f-mathematics', title: 'F. Mathematics', classLabel: 'SS 1A', badge: 'core', image: IMG_LAB },
  { id: 'biology', title: 'Biology', classLabel: 'SS 1A', badge: 'lab', image: IMG_CHALK },
  { id: 'civic', title: 'Civic Education', classLabel: 'SS 1A', badge: 'elective', image: IMG_LAB },
  { id: 'social', title: 'Social Studies', classLabel: 'SS 1A', badge: 'elective', image: IMG_CHALK },
  { id: 'ict', title: 'ICT', classLabel: 'SS 1A', badge: 'core', image: IMG_LAB },
  { id: 'english', title: 'English Language', classLabel: 'SS 1A', badge: 'core', image: IMG_CHALK },
  { id: 'programming', title: 'Programming Basics', classLabel: 'SS 1A', badge: 'elective', image: IMG_LAB },
];

const TEACHER_NAME = 'Mr. Davies Ajegunle';

const SUBJECT_FILTER_OPTIONS = [{ id: 'all', label: 'All subjects' }, ...MY_SUBJECTS.map((s) => ({ id: s.id, label: s.title }))];

const badgeLabel = (badge) => {
  if (badge === 'core') return 'CORE';
  if (badge === 'lab') return 'LAB-BASED';
  return 'ELECTIVE';
};

export default function MySubjects() {
  const [subjectFilterOpen, setSubjectFilterOpen] = useState(false);
  const [subjectFilterId, setSubjectFilterId] = useState('all');
  const subjectFilterRef = useRef(null);

  const visibleTeachers =
    subjectFilterId === 'all'
      ? MY_SUBJECTS
      : MY_SUBJECTS.filter((s) => s.id === subjectFilterId);

  useEffect(() => {
    if (!subjectFilterOpen) return undefined;
    const onPointerDown = (event) => {
      if (subjectFilterRef.current && !subjectFilterRef.current.contains(event.target)) {
        setSubjectFilterOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSubjectFilterOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [subjectFilterOpen]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="My subjects">
          <section className="dashboard__title-row" aria-label="Page title">
            <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
              menu_book
            </span>
            <h1 className="dashboard__title">My Subjects</h1>
          </section>

          <section className="dashboard__body dashboard__body--my-subjects" aria-label="Subjects and teachers">
            <div className="dashboard__primary">
              <div className="my-subjects">
                <div className="my-subjects__grid">
                  {MY_SUBJECTS.map((subject) => (
                    <article key={subject.id} className="my-subjects__card" aria-label={subject.title}>
                      <div className="my-subjects__media">
                        <img className="my-subjects__image" src={subject.image} alt="" />
                        <span className={`my-subjects__badge my-subjects__badge--${subject.badge}`}>
                          {badgeLabel(subject.badge)}
                        </span>
                      </div>
                      <div className="my-subjects__body">
                        <h2 className="my-subjects__name">{subject.title}</h2>
                        <p className="my-subjects__class">{subject.classLabel}</p>
                        <button type="button" className="my-subjects__download">
                          <span className="material-symbols-outlined" aria-hidden>
                            download
                          </span>
                          <span className="my-subjects__download-label">Download Note</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="my-subjects__term-note">Viewing First term 2024/2025</p>
              </div>
            </div>

            <aside className="dashboard__aside" aria-label="Teachers">
              <article className="my-subjects__teachers-card">
                <header className="my-subjects__teachers-head">
                  <h2 className="my-subjects__teachers-title">Teachers</h2>
                  <div className="dashboard__filter-pack" ref={subjectFilterRef}>
                    <button
                      type="button"
                      className="dashboard__filter-trigger dashboard__filter-trigger--compact"
                      aria-expanded={subjectFilterOpen}
                      aria-haspopup="menu"
                      onClick={() => setSubjectFilterOpen((open) => !open)}
                    >
                      Subject
                      <span className="material-symbols-outlined" aria-hidden>
                        filter_list
                      </span>
                    </button>
                    {subjectFilterOpen && (
                      <ul className="dashboard__filter-menu" role="menu">
                        {SUBJECT_FILTER_OPTIONS.map((opt) => (
                          <li key={opt.id} role="none">
                            <button
                              type="button"
                              role="menuitem"
                              className={`dashboard__filter-option${opt.id === subjectFilterId ? ' dashboard__filter-option--active' : ''}`}
                              onClick={() => {
                                setSubjectFilterId(opt.id);
                                setSubjectFilterOpen(false);
                              }}
                            >
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </header>
                <ul className="my-subjects__teachers-list">
                  {visibleTeachers.map((subject) => (
                    <li key={subject.id}>
                      <div className="my-subjects__teacher-row">
                        <span className="my-subjects__teacher-avatar" aria-hidden />
                        <div className="my-subjects__teacher-text">
                          <p className="my-subjects__teacher-name">{TEACHER_NAME}</p>
                          <p className="my-subjects__teacher-subject">{subject.title}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
