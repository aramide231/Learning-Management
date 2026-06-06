import { useMemo, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import tutorAvatar from '../sidebar/media/AiTutor.png';
import '../dashboard/Dashboard.css';
import './AiTutor.css';

const PHYSICS_THUMB = `${process.env.PUBLIC_URL}/images/resource-physics-banner.png`;
const MATH_THUMB = `${process.env.PUBLIC_URL}/images/resource-slide-chalkboard.png`;

const LIST_TABS = [
  { id: 'subjects', label: 'Subjects' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'stem', label: 'STEM' },
];

const TUTOR_CHATS = [
  {
    id: 'chemistry',
    name: 'Chemistry SS1',
    tab: 'subjects',
    preview: "Eva: Here's the summary for chemistry topic 3...",
    time: '22:10',
    online: true,
    avatar: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    id: 'physics',
    name: 'PHYSICS SS1',
    tab: 'subjects',
    preview: "Eva: Here's your summary for Physics topic 3...",
    time: '21:15',
    online: false,
    avatar: PHYSICS_THUMB,
  },
  {
    id: 'math',
    name: 'Math SS1',
    tab: 'subjects',
    preview: 'Eva: Let me break down quadratic equations...',
    time: '20:40',
    online: false,
    avatar: MATH_THUMB,
  },
  {
    id: 'english',
    name: 'English SS1',
    tab: 'subjects',
    preview: 'Eva: Here are key points from the last lesson...',
    time: '19:22',
    online: false,
    avatar: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=96&h=96&q=80',
  },
  {
    id: 'further-math',
    name: 'Further Math SS1',
    tab: 'subjects',
    preview: 'Eva: Review these calculus steps with me...',
    time: '18:05',
    online: false,
    avatar: MATH_THUMB,
  },
  {
    id: 'quiz-prep',
    name: 'Quiz Prep',
    tab: 'quiz',
    preview: 'Eva: Ready for a quick practice quiz?',
    time: '17:30',
    online: false,
    avatar: tutorAvatar,
  },
  {
    id: 'stem-review',
    name: 'STEM Review',
    tab: 'stem',
    preview: 'Eva: Let us recap today’s STEM topics...',
    time: '16:48',
    online: true,
    avatar: PHYSICS_THUMB,
  },
];

const SUGGESTION_CHIPS = ['Physics Summary', "Bernoulli's", 'f =ma'];

const SHARED_MEDIA_SECTIONS = [
  { id: 'photos', label: 'Photos', icon: 'photo', count: 0 },
  { id: 'documents', label: 'Document', icon: 'description', count: 0 },
  { id: 'links', label: 'Links', icon: 'link', count: 0 },
  { id: 'starred', label: 'Starred', icon: 'star', count: 0 },
];

const ACTION_BUTTONS = [
  { id: 'pin', icon: 'push_pin', label: 'Pin' },
  { id: 'folder', icon: 'folder_special', label: 'Folder' },
  { id: 'game', icon: 'sports_esports', label: 'Games' },
  { id: 'trophy', icon: 'emoji_events', label: 'Trophy' },
];

export default function AiTutor() {
  const [listTab, setListTab] = useState('subjects');
  const [activeChatId, setActiveChatId] = useState('physics');
  const [messageDraft, setMessageDraft] = useState('');
  const [expandedMedia, setExpandedMedia] = useState({});

  const filteredChats = useMemo(() => {
    return TUTOR_CHATS.filter((chat) => chat.tab === listTab);
  }, [listTab]);

  const activeChat = TUTOR_CHATS.find((chat) => chat.id === activeChatId) ?? TUTOR_CHATS[1];

  const toggleMediaSection = (sectionId) => {
    setExpandedMedia((current) => ({ ...current, [sectionId]: !current[sectionId] }));
  };

  const handleTabChange = (tabId) => {
    setListTab(tabId);
    const firstInTab = TUTOR_CHATS.find((chat) => chat.tab === tabId);
    if (firstInTab) setActiveChatId(firstInTab.id);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="AI Tutor">
          <section className="dashboard__title-row" aria-label="Page title">
            <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
              cognition
            </span>
            <h1 className="dashboard__title">AI Tutor</h1>
          </section>

          <div className="ai-tutor">
            <aside className="ai-tutor__list-panel" aria-label="Subject chats">
              <div className="ai-tutor__list-tabs" role="tablist" aria-label="Chat filters">
                {LIST_TABS.map((tab) => {
                  const isActive = listTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`ai-tutor__list-tab${isActive ? ' ai-tutor__list-tab--active' : ''}`}
                      onClick={() => handleTabChange(tab.id)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <ul className="ai-tutor__chat-list">
                {filteredChats.map((chat) => {
                  const isActive = chat.id === activeChatId;
                  return (
                    <li key={chat.id}>
                      <button
                        type="button"
                        className={`ai-tutor__chat-item${isActive ? ' ai-tutor__chat-item--active' : ''}`}
                        onClick={() => setActiveChatId(chat.id)}
                      >
                        <img className="ai-tutor__chat-avatar" src={chat.avatar} alt="" />
                        <span className="ai-tutor__chat-body">
                          <span className="ai-tutor__chat-top">
                            <span className="ai-tutor__chat-name-row">
                              <span className="ai-tutor__chat-name">{chat.name}</span>
                              {chat.online && <span className="ai-tutor__online-dot" aria-hidden />}
                            </span>
                            <span className="ai-tutor__chat-time">{chat.time}</span>
                          </span>
                          <span className="ai-tutor__chat-preview">{chat.preview}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <section className="ai-tutor__thread-panel" aria-label={`${activeChat.name} tutor chat`}>
              <div className="ai-tutor__welcome">
                <span className="ai-tutor__welcome-icon material-symbols-outlined" aria-hidden>
                  cognition
                </span>
                <p className="ai-tutor__welcome-greeting">Good Morning Joseph</p>
                <h2 className="ai-tutor__welcome-title">What can I help you with today</h2>
                <div className="ai-tutor__suggestions">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button key={chip} type="button" className="ai-tutor__suggestion-chip">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <footer className="ai-tutor__composer">
                <div className="ai-tutor__composer-field">
                  <button type="button" className="ai-tutor__composer-icon" aria-label="Add emoji">
                    <span className="material-symbols-outlined" aria-hidden>
                      sentiment_satisfied
                    </span>
                  </button>
                  <button type="button" className="ai-tutor__composer-icon" aria-label="Attach file">
                    <span className="material-symbols-outlined" aria-hidden>
                      attach_file
                    </span>
                  </button>
                  <label className="visually-hidden" htmlFor="ai-tutor-message">
                    Ask anything
                  </label>
                  <input
                    id="ai-tutor-message"
                    type="text"
                    className="ai-tutor__composer-input"
                    placeholder="Ask Anything"
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                  />
                </div>
                <button type="button" className="ai-tutor__composer-send" aria-label="Send message">
                  <span className="material-symbols-outlined" aria-hidden>
                    send
                  </span>
                </button>
              </footer>
            </section>

            <aside className="ai-tutor__info-panel" aria-label="Tutor utilities">
              <div className="ai-tutor__actions-card">
                <div className="ai-tutor__quick-actions">
                  {ACTION_BUTTONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="ai-tutor__quick-action"
                      aria-label={action.label}
                    >
                      <span className="material-symbols-outlined" aria-hidden>
                        {action.icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <article className="ai-tutor__panel-card">
                <h3 className="ai-tutor__panel-title">Shared Media</h3>
                <ul className="ai-tutor__media-list">
                  {SHARED_MEDIA_SECTIONS.map((section) => {
                    const isOpen = expandedMedia[section.id];
                    return (
                      <li key={section.id} className="ai-tutor__media-item">
                        <button
                          type="button"
                          className="ai-tutor__media-trigger"
                          aria-expanded={Boolean(isOpen)}
                          onClick={() => toggleMediaSection(section.id)}
                        >
                          <span className="ai-tutor__media-left">
                            <span className="material-symbols-outlined" aria-hidden>
                              {section.icon}
                            </span>
                            <span>{section.label}</span>
                          </span>
                          <span className="ai-tutor__media-right">
                            <span>{section.count}</span>
                            <span
                              className={`material-symbols-outlined ai-tutor__media-caret${isOpen ? ' ai-tutor__media-caret--open' : ''}`}
                              aria-hidden
                            >
                              expand_more
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
