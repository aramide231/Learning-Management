import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Sidebar.css';
import dashboardIcon from './media/_dashboard.png';
import mySubjectsIcon from './media/mySubject.png';
import assignmentIcon from './media/assignment.png';
import gradesIcon from './media/Grades.png';
import resourcesIcon from './media/rescources.png';
import chatRoomIcon from './media/chatRoom.png';
import aiTutorIcon from './media/AiTutor.png';
import feePaymentIcon from './media/feePayment.png';
import supportIcon from './media/Support.png';
import settingsIcon from './media/settings (2).png';
import logoutIcon from './media/logout.png';

const defaultSections = [
  {
    title: 'Main Menu',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon, active: true },
      { id: 'subjects', label: 'My Subjects', icon: mySubjectsIcon },
      { id: 'assignment', label: 'Assignment', icon: assignmentIcon, dot: true },
      { id: 'grades', label: 'Grades', icon: gradesIcon },
    ],
  },
  {
    title: 'Learning Menu',
    items: [
      { id: 'resources', label: 'Resources', icon: resourcesIcon },
      { id: 'chat-room', label: 'Chat Room', icon: chatRoomIcon },
      { id: 'ai-tutor', label: 'AI Tutor', icon: aiTutorIcon, badge: 'NEW' },
    ],
  },
  {
    title: 'Others',
    items: [
      { id: 'fee-payment', label: 'Fee Payment', icon: feePaymentIcon },
      { id: 'support', label: 'Support', icon: supportIcon },
    ],
  },
];

const defaultFooterItems = [
  { id: 'settings', label: 'Settings', icon: settingsIcon },
  { id: 'logout', label: 'Logout', icon: logoutIcon },
];

export default function Sidebar({
  appName = 'Evodemy',
  accountRole = 'Student',
  sections = defaultSections,
  footerItems = defaultFooterItems,
}) {
  const [schoolName, setSchoolName] = useState('School Name');
  const [schoolLogo, setSchoolLogo] = useState(`${process.env.PUBLIC_URL}/images/school-logo-mark.png`);

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
        <img className="sidebar__school-thumb" src={schoolLogo} alt="" width={30} height={30} />
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
                        <img src={item.icon} alt="" className="sidebar__item-icon" aria-hidden />
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
                <img src={item.icon} alt="" className="sidebar__item-icon" aria-hidden />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
