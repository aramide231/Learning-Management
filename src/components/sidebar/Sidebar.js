import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Sidebar.css';

const defaultSections = [
  {
    title: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
      { id: 'subjects', label: 'My Subjects', icon: 'menu_book' },
      { id: 'assignment', label: 'Assignment', icon: 'assignment', dot: true },
      { id: 'grades', label: 'Grades', icon: 'grading' },
    ],
  },
  {
    title: 'Learning Menu',
    items: [
      { id: 'resources', label: 'Resources', icon: 'folder' },
      { id: 'chat-room', label: 'Chat Room', icon: 'forum' },
      { id: 'ai-tutor', label: 'AI Tutor', icon: 'smart_toy', badge: 'NEW' },
    ],
  },
  {
    title: 'Others',
    items: [
      { id: 'fee-payment', label: 'Fee Payment', icon: 'payments' },
      { id: 'support', label: 'Support', icon: 'support_agent' },
    ],
  },
];

const defaultFooterItems = [
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'logout', label: 'Logout', icon: 'logout' },
];

export default function Sidebar({
  appName = 'Evodemy',
  accountRole = 'Student',
  sections = defaultSections,
  footerItems = defaultFooterItems,
}) {
  const [schoolName, setSchoolName] = useState('School Name');
  const [schoolLogo, setSchoolLogo] = useState('');

  const [openSections, setOpenSections] = useState(() =>
    sections.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  useEffect(() => {
    fetch('/school.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.schoolName) setSchoolName(data.schoolName);
        if (data.schoolLogo) setSchoolLogo(data.schoolLogo);
      })
      .catch((error) => {
        console.error('Error fetching school data:', error);
      });
  }, []);

  const toggleSection = (sectionTitle) => {
    setOpenSections((current) => ({
      ...current,
      [sectionTitle]: !current[sectionTitle],
    }));
  };

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar__brand">
        <h1 className="sidebar__logo">
          {appName}
          <span className="sidebar__tm">TM</span>
        </h1>
      </div>

      <div className="sidebar__school-card">
        <img className="sidebar__school-thumb" src={schoolLogo} alt={`${schoolName} logo`} width={30} height={30} />
        <div className="sidebar__school-text">
          <p className="sidebar__school-name">{schoolName}</p>
          <p className="sidebar__school-class">{accountRole}</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary navigation">
        {sections.map((section) => (
          <section className="sidebar__section" key={section.title}>
            <button
              type="button"
              className="sidebar__section-trigger"
              onClick={() => toggleSection(section.title)}
              aria-expanded={openSections[section.title]}
            >
              <h2 className="sidebar__section-title">{section.title}</h2>
              <ChevronDown
                size={13}
                className={`sidebar__section-caret${openSections[section.title] ? ' sidebar__section-caret--open' : ''}`}
                aria-hidden
              />
            </button>
            {openSections[section.title] && (
              <ul className="sidebar__list">
                {section.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`sidebar__item${item.active ? ' sidebar__item--active' : ''}`}
                      >
                        <span className="sidebar__item-icon material-symbols-outlined" aria-hidden>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {item.dot && <span className="sidebar__dot" aria-hidden />}
                        {item.badge && <span className="sidebar__badge">{item.badge}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </nav>

      <div className="sidebar__footer" role="navigation" aria-label="Account">
        <ul className="sidebar__list">
          {footerItems.map((item) => (
            <li key={item.id}>
              <button type="button" className="sidebar__item">
                <span className="sidebar__item-icon material-symbols-outlined" aria-hidden>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
