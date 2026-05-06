import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__main">
        <Header />
        <main className="dashboard__content" aria-label="Dashboard content" />
      </div>
    </div>
  );
}
