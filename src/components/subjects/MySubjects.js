import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import '../dashboard/Dashboard.css';
import './MySubjects.css';

export default function MySubjects() {
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

          <section className="dashboard__body dashboard__body--subjects-shell">
            <div className="dashboard__primary" />
          </section>
        </main>
      </div>
    </div>
  );
}
