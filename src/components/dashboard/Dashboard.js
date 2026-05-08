import { useEffect, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './Dashboard.css';

const RESOURCE_PHYSICS_IMAGE = `${process.env.PUBLIC_URL}/images/resource-physics-banner.png`;

const PHYSICS_RESOURCE_SLIDES = Array.from({ length: 6 }, (_, i) => ({
  id: `physics-slide-${i}`,
}));

const physicsCardContent = {
  title: 'Physics: Quantum Mechanics',
  author: 'By Prof Dada Taiwo',
  progress: 25,
};

const subjectCards = [
  { id: 'physics', title: 'Physics', subtitle: 'Electricity' },
  { id: 'mathematics', title: 'Mathematics', subtitle: 'Algebraic equation I' },
  { id: 'chemistry', title: 'Chemistry', subtitle: 'Organic Chemistry II' },
  { id: 'ict', title: 'ICT', subtitle: 'Data security in computing' },
];

const taskItems = [
  { id: 'mathematics', title: 'Mathematics', progress: '25%', done: false },
  { id: 'english-language', title: 'English Language', progress: '100%', done: true },
];

const analyticsData = [
  { name: 'Mh', grades: 62, attendance: 74 },
  { name: 'Chm', grades: 56, attendance: 71 },
  { name: 'Phy', grades: 68, attendance: 79 },
  { name: 'Bio', grades: 60, attendance: 72 },
  { name: 'F.Mth', grades: 75, attendance: 88 },
  { name: 'ICT', grades: 66, attendance: 76 },
  { name: 'T.D', grades: 52, attendance: 69 },
  { name: 'Eng', grades: 64, attendance: 77 },
  { name: 'Eco', grades: 58, attendance: 73 },
];

const discussionItems = [
  {
    id: 'patrick',
    name: 'Patrick Gabrielle',
    message: "Let's have a quiz battle tonight, I bet you can...",
    time: '09:01',
    active: true,
  },
  {
    id: 'badmus',
    name: 'Badmus Ganju',
    message: 'Guy, why u dey do like this nau, and you know s...',
    time: '07:40',
    active: false,
  },
];

const quizRows = [
  { id: 'victoria', name: 'Wiliams Victoria A.', className: 'JS 3', rank: '1 st', score: '9 points' },
  { id: 'obong', name: 'Obong Victor E.', className: 'SS 1', rank: '2 nd', score: '8 points' },
  { id: 'jerome', name: 'Jerome Amore O.', className: 'JS 2', rank: '3 rd', score: '7 points' },
  { id: 'adebisi1', name: 'Adebisi Mustapha F.', className: 'SS 3', rank: '4 th', score: '6 points' },
  { id: 'adebisi2', name: 'Adebisi Mustapha F.', className: 'SS 3', rank: '4 th', score: '6 points' },
];

const notifications = [
  { id: 'math', title: 'Mathematics', text: 'Assignment due in 3 hours' },
  { id: 'sports', title: 'Interhouse Sports', text: 'Prepare yourselves for an epic experi...' },
];

export default function Dashboard() {
  const [resourceSlideIndex, setResourceSlideIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setResourceSlideIndex((i) => (i + 1) % PHYSICS_RESOURCE_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Dashboard content">
          <section className="dashboard__title-row" aria-label="Dashboard title">
            <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
              dashboard
            </span>
            <h1 className="dashboard__title">Dashboard</h1>
          </section>

          <section className="dashboard__body">
            <div className="dashboard__primary">
              <section className="dashboard__subjects" aria-label="Subjects">
                <div className="dashboard__subjects-head">
                  <h2 className="dashboard__subjects-title">Subjects</h2>
                  <button type="button" className="dashboard__view-all">
                    <span>view all</span>
                    <span className="material-symbols-outlined" aria-hidden>
                      arrow_forward
                    </span>
                  </button>
                </div>

                <div className="dashboard__subjects-grid">
                  {subjectCards.map((subject) => (
                    <article key={subject.id} className="dashboard__subject-card">
                      <h3 className="dashboard__subject-name">{subject.title}</h3>
                      <p className="dashboard__subject-subtitle">{subject.subtitle}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="dashboard__cards-row" aria-label="Task cards row">
                <article className="dashboard__task-card" aria-label="Task card">
                  <header className="dashboard__task-head">
                    <h2 className="dashboard__task-title">
                      Task
                      <span className="dashboard__task-count">2</span>
                    </h2>
                    <button type="button" className="dashboard__task-filter">
                      Assignment
                      <span className="material-symbols-outlined" aria-hidden>
                        filter_list
                      </span>
                    </button>
                  </header>

                  <p className="dashboard__task-note">complete these assignments by friday, 9PM</p>

                  <ul className="dashboard__task-list">
                    {taskItems.map((task) => (
                      <li key={task.id} className="dashboard__task-item">
                        <span className="dashboard__task-avatar" aria-hidden />
                        <div className="dashboard__task-details">
                          <p className="dashboard__task-item-title">{task.title}</p>
                          <div className="dashboard__task-progress-wrap">
                            <span className="dashboard__task-progress">{task.progress}</span>
                            <span className="dashboard__task-progress-line" aria-hidden />
                          </div>
                        </div>
                        <span className="dashboard__task-status material-symbols-outlined" aria-hidden>
                          {task.done ? 'done' : 'play_arrow'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="dashboard__analytics-card" aria-label="Analytics card">
                  <header className="dashboard__analytics-head">
                    <h2 className="dashboard__analytics-title">Analytics</h2>
                    <div className="dashboard__analytics-legend" aria-hidden>
                      <span className="dashboard__analytics-dot dashboard__analytics-dot--grades" />
                      <span>Grades</span>
                      <span className="dashboard__analytics-dot dashboard__analytics-dot--attendance" />
                      <span>Attendance</span>
                    </div>
                  </header>

                  <div className="dashboard__analytics-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData} barGap={4} barCategoryGap="26%" margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
                        <XAxis
                          dataKey="name"
                          interval={0}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 9, fill: '#6b7280' }}
                        />
                        <YAxis
                          ticks={[0, 20, 40, 60, 80, 100]}
                          domain={[0, 100]}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fontSize: 10, fill: '#9ca3af' }}
                        />
                        <Bar dataKey="grades" radius={[8, 8, 0, 0]} barSize={7}>
                          {analyticsData.map((entry) => (
                            <Cell key={`${entry.name}-grades`} fill={entry.name === 'F.Mth' ? '#111827' : '#d1d5db'} />
                          ))}
                        </Bar>
                        <Bar dataKey="attendance" radius={[8, 8, 0, 0]} barSize={7}>
                          {analyticsData.map((entry) => (
                            <Cell key={`${entry.name}-attendance`} fill="#eceff3" />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>
              </section>

              <section className="dashboard__lower-row" aria-label="Discussion and quiz section">
                <article className="dashboard__discussion-card" aria-label="Discussion forum">
                  <header className="dashboard__discussion-head">
                    <h2 className="dashboard__discussion-title">Discussion Forum</h2>
                    <button type="button" className="dashboard__discussion-more" aria-label="More options">
                      <span className="material-symbols-outlined" aria-hidden>
                        more_horiz
                      </span>
                    </button>
                  </header>

                  <nav className="dashboard__discussion-tabs" aria-label="Discussion categories">
                    <button type="button" className="dashboard__discussion-tab dashboard__discussion-tab--active">
                      Personal
                    </button>
                    <button type="button" className="dashboard__discussion-tab">
                      Groups
                    </button>
                    <button type="button" className="dashboard__discussion-tab">
                      Teachers
                    </button>
                  </nav>

                  <ul className="dashboard__discussion-list">
                    {discussionItems.map((item) => (
                      <li key={item.id} className="dashboard__discussion-item">
                        <span className="dashboard__discussion-avatar" aria-hidden />
                        <div className="dashboard__discussion-content">
                          <p className="dashboard__discussion-name-row">
                            <span className="dashboard__discussion-name">{item.name}</span>
                            {item.active && <span className="dashboard__discussion-online" aria-hidden />}
                          </p>
                          <p className="dashboard__discussion-message">{item.message}</p>
                        </div>
                        <span className="dashboard__discussion-time">{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="dashboard__quiz-card" aria-label="Quiz scoreboard">
                  <header className="dashboard__quiz-head">
                    <h2 className="dashboard__quiz-title">Quiz Scoreboard</h2>
                    <button type="button" className="dashboard__quiz-more" aria-label="More options">
                      <span className="material-symbols-outlined" aria-hidden>
                        more_horiz
                      </span>
                    </button>
                  </header>

                  <div className="dashboard__quiz-table-head" aria-hidden>
                    <span>NAME</span>
                    <span>CLASS</span>
                    <span>RANK</span>
                    <span>SCORE</span>
                  </div>

                  <ul className="dashboard__quiz-list">
                    {quizRows.map((row) => (
                      <li key={row.id} className="dashboard__quiz-row">
                        <div className="dashboard__quiz-name-wrap">
                          <span className="dashboard__quiz-avatar" aria-hidden />
                          <span className="dashboard__quiz-name">{row.name}</span>
                        </div>
                        <span className="dashboard__quiz-cell">{row.className}</span>
                        <span className="dashboard__quiz-cell">{row.rank}</span>
                        <span className="dashboard__quiz-cell">{row.score}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </section>
            </div>

            <aside className="dashboard__aside" aria-label="Dashboard right side">
              <article className="dashboard__resource-card" aria-label="Resources">
                <header className="dashboard__resource-head">
                  <h3 className="dashboard__resource-title">Resources</h3>
                  <button type="button" className="dashboard__resource-pill">
                    PDF
                    <span className="material-symbols-outlined" aria-hidden>
                      filter_list
                    </span>
                  </button>
                </header>

                <div className="dashboard__resource-viewport">
                  <div
                    className="dashboard__resource-track"
                    style={{ transform: `translateX(-${resourceSlideIndex * 100}%)` }}
                  >
                    {PHYSICS_RESOURCE_SLIDES.map((slide) => (
                      <div key={slide.id} className="dashboard__resource-slide-panel">
                        <div className="dashboard__resource-media">
                          <img
                            className="dashboard__resource-image"
                            src={RESOURCE_PHYSICS_IMAGE}
                            alt=""
                          />
                          <span className="dashboard__resource-new-badge">NEW</span>
                        </div>
                        <p className="dashboard__resource-name">{physicsCardContent.title}</p>
                        <p className="dashboard__resource-author">{physicsCardContent.author}</p>
                        <div className="dashboard__resource-progress-row">
                          <span className="dashboard__resource-pct">{physicsCardContent.progress}%</span>
                          <div className="dashboard__resource-bar-track" aria-hidden>
                            <div
                              className="dashboard__resource-bar-fill"
                              style={{ width: `${physicsCardContent.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dashboard__resource-dots" role="tablist" aria-label="Lesson slides">
                  {PHYSICS_RESOURCE_SLIDES.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={i === resourceSlideIndex}
                      className={`dashboard__resource-dot${i === resourceSlideIndex ? ' dashboard__resource-dot--active' : ''}`}
                      onClick={() => setResourceSlideIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </article>

              <article className="dashboard__performance-card">
                <header className="dashboard__performance-head">
                  <h3 className="dashboard__performance-title">Performance</h3>
                  <button type="button" className="dashboard__performance-pill">
                    First Term
                    <span className="material-symbols-outlined" aria-hidden>
                      filter_list
                    </span>
                  </button>
                </header>
                <div className="dashboard__performance-body">
                  <div className="dashboard__performance-chart" aria-hidden>
                    <span className="dashboard__performance-center">6</span>
                  </div>
                  <ul className="dashboard__performance-list">
                    <li>
                      <span className="dashboard__analytics-dot dashboard__analytics-dot--grades" />
                      <span>Assignment</span>
                      <strong>15</strong>
                    </li>
                    <li>
                      <span className="dashboard__analytics-dot dashboard__analytics-dot--attendance" />
                      <span>Quiz</span>
                      <strong>9</strong>
                    </li>
                    <li>
                      <span className="dashboard__dot" />
                      <span>Projects</span>
                      <strong>6</strong>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="dashboard__notification-card">
                <header className="dashboard__notification-head">
                  <h3 className="dashboard__notification-title">
                    Notification
                    <span className="dashboard__task-count">2</span>
                  </h3>
                  <button type="button" className="dashboard__notification-check">
                    <span className="material-symbols-outlined" aria-hidden>
                      done_all
                    </span>
                  </button>
                </header>
                <ul className="dashboard__notification-list">
                  {notifications.map((item) => (
                    <li key={item.id} className="dashboard__notification-item">
                      <span className="dashboard__notification-bell material-symbols-outlined" aria-hidden>
                        notifications
                      </span>
                      <div>
                        <p>{item.title}</p>
                        <small>{item.text}</small>
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
