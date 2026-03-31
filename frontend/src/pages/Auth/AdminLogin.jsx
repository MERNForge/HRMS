import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { getLoginError, saveUserSession } from './authHelpers';
import './Login.css';

function AdminLogin() {
  const navigate = useNavigate();
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminIdSubmit = (event) => {
    event.preventDefault();

    if (!adminId.trim()) {
      setError('Please enter your Admin ID.');
      return;
    }

    setError('');
    setShowPasswordStep(true);
  };

  const goBack = () => {
    setShowPasswordStep(false);
    setPassword('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login({ identifier: adminId.trim(), password });
      saveUserSession(response, 'admin');
      navigate('/dashboard/admin', {
        replace: true,
        state: {
          welcomeMessage: 'Welcome back, Admin. Your dashboard is ready.',
        },
      });
    } catch (loginError) {
      setError(getLoginError(loginError));
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-left">
          <div className="admin-logo">HR</div>
          <h2>HRMS Portal</h2>
          <p>Admin login for the management dashboard</p>
        </div>

        <div className="admin-login-right">
          <h1>Admin Login</h1>
          <p>{showPasswordStep ? 'Enter your password' : 'Enter your Admin ID'}</p>

          <form onSubmit={showPasswordStep ? handleSubmit : handleAdminIdSubmit}>
            <label className="role-field">
              <span>Admin ID</span>
              <input
                type="text"
                value={adminId}
                onChange={(event) => setAdminId(event.target.value)}
                placeholder="Enter Admin ID"
                required
                readOnly={showPasswordStep}
              />
            </label>

            {showPasswordStep && (
              <label className="role-field">
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter Password"
                  required
                />
              </label>
            )}

            {error && <p className="role-login-error">{error}</p>}

            <div className="role-login-actions">
              {showPasswordStep && (
                <button
                  type="button"
                  className="role-submit-button"
                  style={{ background: '#dfe7ff', color: '#334ea3' }}
                  onClick={goBack}
                  disabled={loading}
                >
                  Back
                </button>
              )}

              <button
                type="submit"
                className="role-submit-button"
                style={{ minWidth: 120 }}
                disabled={loading}
              >
                {showPasswordStep ? (loading ? 'Logging in...' : 'Login') : 'Next'}
              </button>
            </div>
          </form>

          <p style={{ marginTop: '14px', color: '#8a8fab' }}>Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
