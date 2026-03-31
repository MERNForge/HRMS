import { useNavigate } from 'react-router-dom';
import { portals } from './portalConfig';
import './Login.css';

function PortalCard({ portal, onOpen }) {
  return (
    <article
      className="portal-card"
      style={{
        '--card-accent': portal.primaryColor,
        '--card-accent-2': portal.secondaryColor,
        '--card-shadow': portal.shadowColor,
      }}
    >
      <div className="portal-head">
        <span className="portal-label">{portal.label}</span>
        <span className="portal-status">{portal.status}</span>
      </div>

      <div className="portal-icon">{portal.icon}</div>

      <h2>{portal.title}</h2>
      <p>{portal.description}</p>

      <div className="portal-features" aria-label={`${portal.title} features`}>
        {portal.features.map((feature) => (
          <span key={feature} className="feature-pill">
            {feature}
          </span>
        ))}
      </div>

      <button type="button" className="portal-button" onClick={() => onOpen(portal.loginPath)}>
        <span>Login Now</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 12h14M13.5 6.5 19 12l-5.5 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </article>
  );
}

function Login() {
  const navigate = useNavigate();
  const openPortal = (loginPath) => navigate(loginPath);

  return (
    <div className="login-page">
      <div className="login-shell">
        <header className="hero-panel">
          <div className="hero-logo" aria-hidden="true">
            HR
          </div>
          <h1>HRMS Portal</h1>
          <p>Human Resource Management System</p>
        </header>

        <main className="portal-grid" aria-label="HRMS login portals">
          {portals.map((portal) => (
            <PortalCard key={portal.role} portal={portal} onOpen={openPortal} />
          ))}
        </main>

        <footer className="login-footer">&copy; 2026 HRMS Portal. All rights reserved.</footer>
      </div>
    </div>
  );
}

export default Login;
