import { useEffect, useRef, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './Grades.css';
import { useGrades } from '../../data/gradesData';

export default function Grades() {
  const { grades, loading, error } = useGrades();
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

  const filterLabel =
    grades.termFilters.find((o) => o.id === filterId)?.label ?? 'All';

  const visibleCourses =
    filterId === 'all'
      ? grades.courses
      : grades.courses.filter((c) => c.term === filterId);

  const { summary } = grades;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Grades">
          <section className="dashboard__title-row grades__title-row" aria-label="Page title">
            <div className="grades__title-start">
              <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
                grading
              </span>
              <h1 className="dashboard__title">Grades</h1>
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
                  {grades.termFilters.map((opt) => (
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

          <div className="grades">
            {loading && <p className="grades__status">Loading grades…</p>}
            {error && (
              <p className="grades__status grades__status--error" role="alert">
                Could not load grades. Check public/school.json.
              </p>
            )}

            {!loading && !error && (
              <>
                <h2 className="grades__summary-heading">Summary</h2>
                <div className="grades__summary-grid">
                  <article className="grades__summary-card">
                    <div className="grades__summary-top">
                      <span className="grades__summary-label">Performance</span>
                      <span className="grades__summary-icon material-symbols-outlined" aria-hidden>
                        show_chart
                      </span>
                    </div>
                    <p className="grades__summary-value">{summary.performance}%</p>
                  </article>
                  <article className="grades__summary-card">
                    <div className="grades__summary-top">
                      <span className="grades__summary-label">Best Subject</span>
                      <span className="grades__summary-icon material-symbols-outlined" aria-hidden>
                        emoji_events
                      </span>
                    </div>
                    <p className="grades__summary-value grades__summary-value--text">
                      {summary.bestSubject}
                    </p>
                  </article>
                  <article className="grades__summary-card">
                    <div className="grades__summary-top">
                      <span className="grades__summary-label">Weak Subject</span>
                      <span className="grades__summary-icon material-symbols-outlined" aria-hidden>
                        warning
                      </span>
                    </div>
                    <p className="grades__summary-value grades__summary-value--text">
                      {summary.weakSubject}
                    </p>
                  </article>
                  <article className="grades__summary-card">
                    <div className="grades__summary-top">
                      <span className="grades__summary-label">Class Rank</span>
                      <span className="grades__summary-icon material-symbols-outlined" aria-hidden>
                        military_tech
                      </span>
                    </div>
                    <p className="grades__summary-value grades__summary-value--text">
                      {summary.classRank}
                    </p>
                  </article>
                </div>

                <div className="grades__table-wrap">
                  <table className="grades__table">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">COURSE NAME</th>
                        <th scope="col">ASSIGNMENT</th>
                        <th scope="col">TEST</th>
                        <th scope="col">EXAMINATION</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">CUMMULATIVE</th>
                        <th scope="col">GRADE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCourses.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="grades__table-empty">
                            No grades for this term.
                          </td>
                        </tr>
                      ) : (
                        visibleCourses.map((row, index) => (
                          <tr key={row.id ?? index}>
                            <td>{index + 1}</td>
                            <td className="grades__course-name">{row.courseName}</td>
                            <td>{row.assignment}</td>
                            <td>{row.test}</td>
                            <td>{row.examination}</td>
                            <td>{row.total}</td>
                            <td>{row.cumulative}</td>
                            <td>
                              <span className="grades__grade-badge">{row.grade}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
