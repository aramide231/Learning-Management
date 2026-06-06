import { useMemo, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './ChatRoom.css';

const PHYSICS_THUMB = `${process.env.PUBLIC_URL}/images/resource-physics-banner.png`;
const FORMULA_THUMB = `${process.env.PUBLIC_URL}/images/resource-slide-chalkboard.png`;

const LIST_TABS = [
  { id: 'all', label: 'All' },
  { id: 'groups', label: 'Groups' },
  { id: 'teachers', label: 'Teachers' },
];

const CHAT_GROUPS = [
  {
    id: 'stem',
    name: 'STEM Group',
    tab: 'groups',
    preview: 'Assignment deadline moved to Friday...',
    time: '20:01',
    online: true,
    members: 18,
    onlineCount: 3,
  },
  {
    id: 'chemistry',
    name: 'CHEMISTRY GROUP',
    tab: 'groups',
    preview: 'Lab report template is in resources...',
    time: '19:44',
    online: true,
    members: 22,
    onlineCount: 2,
  },
  {
    id: 'physics',
    name: 'PHYSICS GROUP',
    tab: 'groups',
    preview: 'Can someone explain wave interference again?',
    time: '18:30',
    online: true,
    members: 29,
    onlineCount: 4,
  },
  {
    id: 'math',
    name: 'MATHEMATICS GROUP',
    tab: 'groups',
    preview: 'Quiz prep starts tomorrow at 4PM',
    time: '17:12',
    online: false,
    members: 31,
    onlineCount: 1,
  },
  {
    id: 'teacher-adams',
    name: 'Mr Adams Stephen',
    tab: 'teachers',
    preview: 'Submit your assignment before Friday',
    time: '16:05',
    online: true,
    members: 2,
    onlineCount: 1,
  },
  {
    id: 'teacher-zane',
    name: 'Mr John Zane',
    tab: 'teachers',
    preview: 'Great work on the last test!',
    time: '14:20',
    online: false,
    members: 2,
    onlineCount: 0,
  },
];

const MESSAGES_BY_CHAT = {
  physics: [
    {
      id: 'm1',
      type: 'incoming',
      sender: 'Patrick Gabrielle',
      time: '18:01',
      text: 'Can someone explain wave interference again?',
    },
    {
      id: 'm2',
      type: 'incoming',
      sender: 'Badmus Ganju',
      time: '18:08',
      text: 'Check page 42 of the note — the diagram makes it clearer.',
    },
    {
      id: 'm3',
      type: 'outgoing',
      time: '18:12',
      text: 'Thanks! That helped a lot.',
    },
    {
      id: 'm4',
      type: 'incoming',
      sender: 'Williams Victoria',
      time: '18:25',
      text: 'I uploaded a short summary in shared media if anyone needs it.',
    },
    {
      id: 'm5',
      type: 'outgoing',
      time: '18:30',
      text: "Got it. I'll review it tonight.",
    },
  ],
};

const MEMBERS_BY_CHAT = {
  physics: [
    { id: 'adams', name: 'Mr Adams Stephen', role: 'Admin' },
    { id: 'zane', name: 'Mr John Zane', role: 'Admin' },
  ],
};

const SHARED_MEDIA_SECTIONS = [
  {
    id: 'photos',
    label: 'Photos',
    icon: 'photo',
    count: 155,
    previews: [PHYSICS_THUMB, FORMULA_THUMB],
  },
  { id: 'documents', label: 'Document', icon: 'description', count: 30 },
  { id: 'links', label: 'Links', icon: 'link', count: 25 },
  { id: 'starred', label: 'Starred', icon: 'star', count: 5 },
];

const ACTION_BUTTONS = [
  { id: 'pin', icon: 'push_pin', label: 'Pin' },
  { id: 'folder', icon: 'folder', label: 'Folder' },
  { id: 'game', icon: 'sports_esports', label: 'Games' },
  { id: 'trophy', icon: 'emoji_events', label: 'Trophy' },
];

const THREAD_ACTIONS = [
  { id: 'search', icon: 'search', label: 'Search' },
  { id: 'call', icon: 'call', label: 'Voice call' },
  { id: 'video', icon: 'videocam', label: 'Video call' },
  { id: 'info', icon: 'info', label: 'Group info' },
];

function getMessages(chatId) {
  return MESSAGES_BY_CHAT[chatId] ?? MESSAGES_BY_CHAT.physics;
}

function getMembers(chatId) {
  return MEMBERS_BY_CHAT[chatId] ?? MEMBERS_BY_CHAT.physics;
}

export default function ChatRoom() {
  const [listTab, setListTab] = useState('all');
  const [activeChatId, setActiveChatId] = useState('physics');
  const [messageDraft, setMessageDraft] = useState('');
  const [expandedMedia, setExpandedMedia] = useState({ photos: true });

  const filteredChats = useMemo(() => {
    if (listTab === 'all') return CHAT_GROUPS;
    return CHAT_GROUPS.filter((chat) => chat.tab === listTab);
  }, [listTab]);

  const activeChat = CHAT_GROUPS.find((chat) => chat.id === activeChatId) ?? CHAT_GROUPS[2];
  const messages = getMessages(activeChat.id);
  const members = getMembers(activeChat.id);

  const toggleMediaSection = (sectionId) => {
    setExpandedMedia((current) => ({ ...current, [sectionId]: !current[sectionId] }));
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Chat Room">
          <section className="dashboard__title-row" aria-label="Page title">
            <span className="dashboard__title-icon material-symbols-outlined" aria-hidden>
              forum
            </span>
            <h1 className="dashboard__title">Chat Room</h1>
          </section>

          <div className="chat-room">
            <aside className="chat-room__list-panel" aria-label="Chats">
              <div className="chat-room__list-tabs" role="tablist" aria-label="Chat filters">
                {LIST_TABS.map((tab) => {
                  const isActive = listTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`chat-room__list-tab${isActive ? ' chat-room__list-tab--active' : ''}`}
                      onClick={() => setListTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <ul className="chat-room__chat-list">
                {filteredChats.map((chat) => {
                  const isActive = chat.id === activeChatId;
                  return (
                    <li key={chat.id}>
                      <button
                        type="button"
                        className={`chat-room__chat-item${isActive ? ' chat-room__chat-item--active' : ''}`}
                        onClick={() => setActiveChatId(chat.id)}
                      >
                        <span className="chat-room__chat-avatar" aria-hidden />
                        <span className="chat-room__chat-body">
                          <span className="chat-room__chat-top">
                            <span className="chat-room__chat-name-row">
                              <span className="chat-room__chat-name">{chat.name}</span>
                              {chat.online && <span className="chat-room__online-dot" aria-hidden />}
                            </span>
                            <span className="chat-room__chat-time">{chat.time}</span>
                          </span>
                          <span className="chat-room__chat-preview">{chat.preview}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <section className="chat-room__thread-panel" aria-label={`${activeChat.name} conversation`}>
              <header className="chat-room__thread-head">
                <div className="chat-room__thread-info">
                  <span className="chat-room__thread-avatar" aria-hidden />
                  <div>
                    <h2 className="chat-room__thread-title">{activeChat.name}</h2>
                    <p className="chat-room__thread-meta">
                      {activeChat.members} Members | {activeChat.onlineCount} Online
                    </p>
                  </div>
                </div>
                <div className="chat-room__thread-actions">
                  {THREAD_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="chat-room__head-btn"
                      aria-label={action.label}
                    >
                      <span className="material-symbols-outlined" aria-hidden>
                        {action.icon}
                      </span>
                    </button>
                  ))}
                </div>
              </header>

              <div className="chat-room__messages">
                {messages.map((message) =>
                  message.type === 'outgoing' ? (
                    <article key={message.id} className="chat-room__message chat-room__message--outgoing">
                      <div className="chat-room__bubble chat-room__bubble--outgoing">
                        <p className="chat-room__bubble-text">{message.text}</p>
                        <span className="chat-room__bubble-time">{message.time}</span>
                      </div>
                    </article>
                  ) : (
                    <article key={message.id} className="chat-room__message chat-room__message--incoming">
                      <span className="chat-room__message-avatar" aria-hidden />
                      <div className="chat-room__incoming-wrap">
                        <p className="chat-room__bubble-sender">{message.sender}</p>
                        <div className="chat-room__bubble chat-room__bubble--incoming">
                          <p className="chat-room__bubble-text">{message.text}</p>
                          <span className="chat-room__bubble-time">{message.time}</span>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>

              <footer className="chat-room__composer">
                <div className="chat-room__composer-field">
                  <button type="button" className="chat-room__composer-icon" aria-label="Add emoji">
                    <span className="material-symbols-outlined" aria-hidden>
                      sentiment_satisfied
                    </span>
                  </button>
                  <button type="button" className="chat-room__composer-icon" aria-label="Attach file">
                    <span className="material-symbols-outlined" aria-hidden>
                      attach_file
                    </span>
                  </button>
                  <label className="visually-hidden" htmlFor="chat-room-message">
                    Write a message
                  </label>
                  <input
                    id="chat-room-message"
                    type="text"
                    className="chat-room__composer-input"
                    placeholder="Write a message..."
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                  />
                </div>
                <button type="button" className="chat-room__composer-send" aria-label="Send message">
                  <span className="material-symbols-outlined" aria-hidden>
                    send
                  </span>
                </button>
              </footer>
            </section>

            <aside className="chat-room__info-panel" aria-label="Group details">
              <div className="chat-room__actions-card">
                <div className="chat-room__quick-actions">
                  {ACTION_BUTTONS.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      className="chat-room__quick-action"
                      aria-label={action.label}
                    >
                      <span className="material-symbols-outlined" aria-hidden>
                        {action.icon}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <article className="chat-room__panel-card">
                <h3 className="chat-room__panel-title">Shared Media</h3>
                <ul className="chat-room__media-list">
                  {SHARED_MEDIA_SECTIONS.map((section) => {
                    const isOpen = expandedMedia[section.id];
                    return (
                      <li key={section.id} className="chat-room__media-item">
                        <button
                          type="button"
                          className="chat-room__media-trigger"
                          aria-expanded={Boolean(isOpen)}
                          onClick={() => toggleMediaSection(section.id)}
                        >
                          <span className="chat-room__media-left">
                            <span className="material-symbols-outlined" aria-hidden>
                              {section.icon}
                            </span>
                            <span>{section.label}</span>
                          </span>
                          <span className="chat-room__media-right">
                            <span>{section.count}</span>
                            <span
                              className={`material-symbols-outlined chat-room__media-caret${isOpen ? ' chat-room__media-caret--open' : ''}`}
                              aria-hidden
                            >
                              expand_more
                            </span>
                          </span>
                        </button>
                        {isOpen && section.previews && (
                          <div className="chat-room__media-previews">
                            {section.previews.map((src) => (
                              <img key={src} className="chat-room__media-thumb" src={src} alt="" />
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>

              <article className="chat-room__panel-card">
                <h3 className="chat-room__panel-title">Members</h3>
                <ul className="chat-room__members-list">
                  {members.map((member) => (
                    <li key={member.id} className="chat-room__member-row">
                      <div className="chat-room__member-profile">
                        <span className="chat-room__member-avatar" aria-hidden />
                        <div className="chat-room__member-text">
                          <p className="chat-room__member-name">{member.name}</p>
                          <span className="chat-room__member-role">{member.role}</span>
                        </div>
                      </div>
                      <div className="chat-room__member-actions">
                        <button type="button" className="chat-room__member-btn" aria-label={`Message ${member.name}`}>
                          <span className="material-symbols-outlined" aria-hidden>
                            mail
                          </span>
                        </button>
                        <span className="chat-room__member-divider" aria-hidden />
                        <button type="button" className="chat-room__member-btn" aria-label={`Call ${member.name}`}>
                          <span className="material-symbols-outlined" aria-hidden>
                            call
                          </span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
