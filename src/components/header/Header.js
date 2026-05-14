import { Bell, ChevronDown, Search } from 'lucide-react';
import './Header.css';

export default function Header({
  searchPlaceholder = 'Search anything',
  userName = 'Joseph Adeoye',
  userSubtitle = 'SS1 | First Term 24/25',
  avatarSrc = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80',
}) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header__search-wrap">
        <Search className="dashboard-header__search-icon" size={16} strokeWidth={2} aria-hidden />
        <label htmlFor="dashboard-header-search" className="visually-hidden">
          Search
        </label>
        <input
          id="dashboard-header-search"
          type="search"
          className="dashboard-header__search"
          placeholder={searchPlaceholder}
          autoComplete="off"
        />
      </div>

      <div className="dashboard-header__actions">
        <button type="button" className="dashboard-header__notify" aria-label="Notifications">
          <Bell size={16} strokeWidth={2} aria-hidden />
          <span className="dashboard-header__notify-dot" aria-hidden />
        </button>

        <button type="button" className="dashboard-header__profile">
          <img className="dashboard-header__avatar" src={avatarSrc} alt="" width={32} height={32} />
          <span className="dashboard-header__profile-text">
            <span className="dashboard-header__name-row">
              <span className="dashboard-header__name">{userName}</span>
              <ChevronDown size={12} strokeWidth={2} className="dashboard-header__chevron" aria-hidden />
            </span>
            <span className="dashboard-header__subtitle">{userSubtitle}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
