import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { getLoginError, saveUserSession } from './authHelpers';
import './Login.css';

function EmployeeLogin() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter your Employee ID or email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login({ identifier: identifier.trim(), password });
      saveUserSession(response, 'employee');
      navigate('/dashboard/employee', {
        replace: true,
        state: {
          welcomeMessage: 'Welcome to your employee workspace. Your dashboard is ready.',
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
        <div className="admin-login-left" style={{ background: 'linear-gradient(135deg, #2c7ef7, #24b2df)' }}>
          <div className="admin-logo">HR</div>
          <h2>HRMS Portal</h2>
          <p>Employee login for attendance, leave records, payroll insights, and personal profile access</p>
        </div>

        <div className="admin-login-right">
          <h1>Employee Login</h1>
          <p>Access your employee dashboard using your ID or registered email</p>

          <form onSubmit={handleSubmit}>
            <label className="role-field">
              <span>Employee ID or Email</span>
              <input
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="Enter Employee ID or Email"
                required
              />
            </label>

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

            {error ? <p className="role-login-error">{error}</p> : null}

            <div className="role-login-actions">
              <button
                type="button"
                className="role-submit-button"
                style={{ background: '#dfe7ff', color: '#334ea3' }}
                onClick={() => navigate('/', { replace: true })}
                disabled={loading}
              >
                Back
              </button>

              <button
                type="submit"
                className="role-submit-button"
                style={{ minWidth: 120 }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          <p style={{ marginTop: '14px', color: '#8a8fab' }}>Use the credentials created by HR or Admin.</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
