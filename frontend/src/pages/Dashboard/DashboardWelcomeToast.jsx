function DashboardWelcomeToast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="dashboard-welcome-toast" role="status" aria-live="polite">
      <div className="dashboard-welcome-toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="m6.8 12.4 3.4 3.4 7-7.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="dashboard-welcome-toast-copy">
        <strong>Login successful</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default DashboardWelcomeToast;
