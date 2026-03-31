import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import { clearSession, readSessionUser } from '../../utils/session';

function DashboardShell({ badge, title, description }) {
  const navigate = useNavigate();
  const user = readSessionUser();

  const handleLogout = () => {
    clearSession();
    navigate('/', { replace: true });
  };

  return (
    <div className="admin-view dashboard-shell-page">
      <section className="table-card dashboard-shell-card">
        <span className="dashboard-shell-badge">{badge}</span>
        <h1>{title}</h1>
        <p>{description}</p>

        <div className="dashboard-shell-user">
          <strong>Signed In User</strong>
          <span>{user?.email ?? 'No active session email found.'}</span>
        </div>

        <div className="dashboard-shell-actions">
          <Link to="/" className="secondary-action-button">
            Back to Portal
          </Link>
          <button type="button" className="primary-action-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default DashboardShell;
