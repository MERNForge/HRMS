import { useEffect, useMemo, useState } from 'react';
import { createEmployeeAccount, getEmployeeAccounts } from '../../services/api';
import {
  CalendarIcon,
  ChartIcon,
  DocumentIcon,
  PlusIcon,
  UsersIcon,
  WalletIcon,
} from './dashboardIcons';
import DashboardWelcomeToast from './DashboardWelcomeToast';
import { AnalyticsLineChart, AttendanceBreakdownCard } from './dashboardCharts';
import useWelcomeMessage from './useWelcomeMessage';

const today = new Date().toISOString().slice(0, 10);

const emptyEmployee = {
  name: '',
  designation: '',
  employeeId: '',
  email: '',
  role: 'Team Member',
  status: 'Active',
  joinDate: today,
  password: '',
};

const attendanceData = [
  { label: 'Present', value: 1176, color: '#21c55d' },
  { label: 'On Leave', value: 40, color: '#f59e0b' },
  { label: 'Absent', value: 32, color: '#ef4444' },
];

const growthData = [
  { month: 'Jan', value: 980 },
  { month: 'Feb', value: 1015 },
  { month: 'Mar', value: 1045 },
  { month: 'Apr', value: 1100 },
  { month: 'May', value: 1145 },
  { month: 'Jun', value: 1190 },
  { month: 'Jul', value: 1245 },
].map((item) => ({ ...item, label: item.month }));

const priorityItems = [
  {
    title: 'Approve 6 leave requests',
    description: 'Operations and Finance leave queue is waiting for review.',
    status: 'Urgent',
    tone: 'pending',
  },
  {
    title: 'Onboard 3 new joiners',
    description: 'Offer letters are accepted and induction kits are pending.',
    status: 'In Progress',
    tone: 'completed',
  },
  {
    title: 'Review attendance anomalies',
    description: '12 attendance exceptions should be verified before payroll.',
    status: 'Review',
    tone: 'approved',
  },
];

const leaveQueue = [
  {
    name: 'Ananya Mehta',
    request: '2 day casual leave',
    team: 'Design Team',
    status: 'Pending',
    tone: 'pending',
  },
  {
    name: 'Rohit Jain',
    request: 'Work from home request',
    team: 'Finance',
    status: 'Approved',
    tone: 'approved',
  },
  {
    name: 'Mira Thomas',
    request: 'Half-day medical leave',
    team: 'Customer Success',
    status: 'Review',
    tone: 'completed',
  },
];

const hiringPipeline = [
  { stage: 'Sourcing', count: 18, detail: 'Fresh applications in queue', tone: 'blue' },
  { stage: 'Screening', count: 9, detail: 'Profiles shortlisted for HR round', tone: 'violet' },
  { stage: 'Interview', count: 5, detail: 'Scheduled with hiring managers', tone: 'amber' },
  { stage: 'Offer', count: 3, detail: 'Offers ready for approval', tone: 'green' },
];

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '-';
  }

  return parsed.toISOString().slice(0, 10);
}

function mapEmployee(user) {
  return {
    id: user._id,
    name: user.name || user.loginId,
    designation: user.designation || user.profileRole || 'Team Member',
    employeeId: user.loginId,
    email: user.email || 'No email provided',
    status: user.isActive ? 'Active' : 'Inactive',
    joinDate: formatDate(user.joinDate || user.createdAt),
  };
}

function HRDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [pageError, setPageError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyEmployee);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const welcomeMessage = useWelcomeMessage();

  const metrics = useMemo(
    () => ({
      totalEmployees: employees.length,
      activeEmployees: employees.filter((employee) => employee.status === 'Active').length,
      activeRate:
        employees.length > 0
          ? Math.round(
              (employees.filter((employee) => employee.status === 'Active').length / employees.length) * 100
            )
          : 0,
    }),
    [employees]
  );

  const summaryCards = useMemo(
    () => [
      {
        value: metrics.totalEmployees.toLocaleString(),
        label: 'Total Employees',
        trend: '+12.5%',
        tone: 'blue',
        icon: UsersIcon,
      },
      {
        value: `${metrics.activeRate}%`,
        label: 'Active Workforce',
        trend: '+2.1%',
        tone: 'green',
        icon: ChartIcon,
      },
      { value: '28', label: 'Pending Leaves', trend: '-5.2%', tone: 'amber', icon: CalendarIcon },
      { value: '3', label: 'New Joiners', trend: '+8.3%', tone: 'purple', icon: WalletIcon },
    ],
    [metrics.activeRate, metrics.totalEmployees]
  );

  const recentEmployees = useMemo(() => employees.slice(0, 5), [employees]);

  const workforcePulse = useMemo(
    () => [
      {
        label: 'Active Users',
        value: metrics.activeEmployees.toLocaleString(),
        detail: 'Currently marked active in the system',
      },
      {
        label: 'Departments Covered',
        value: '8',
        detail: 'Teams managed by HR operations',
      },
      {
        label: 'Hiring Openings',
        value: '14',
        detail: 'Across product, sales, and operations',
      },
      {
        label: 'Onboarding Today',
        value: '3',
        detail: 'Employees in joining workflow',
      },
    ],
    [metrics.activeEmployees]
  );

  const loadEmployees = async () => {
    setLoadingEmployees(true);
    setPageError('');

    try {
      const response = await getEmployeeAccounts();
      const accounts = Array.isArray(response?.data) ? response.data.map(mapEmployee) : [];
      setEmployees(accounts);
    } catch (error) {
      setPageError(error?.response?.data?.message || error.message || 'Unable to load employee records.');
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const openCreateModal = () => {
    setDraft(emptyEmployee);
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDraft(emptyEmployee);
    setFormError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleCreateEmployee = async (event) => {
    event.preventDefault();

    if (!draft.password.trim()) {
      setFormError('Password is required for employee account creation.');
      return;
    }

    setSubmitting(true);
    setFormError('');
    setPageError('');

    const payload = {
      name: draft.name.trim(),
      designation: draft.designation.trim(),
      loginId: draft.employeeId.trim(),
      email: draft.email.trim(),
      password: draft.password,
      profileRole: draft.role,
      status: draft.status,
      joinDate: draft.joinDate || today,
    };

    try {
      await createEmployeeAccount(payload);
      await loadEmployees();

      setCreatedCredentials({
        name: payload.name,
        loginId: payload.loginId.toUpperCase(),
        email: payload.email,
        password: payload.password,
      });
      setSuccessMessage(
        `${payload.name} was added successfully. Use the Employee ID and password below in the employee login form.`
      );
      closeModal();
    } catch (error) {
      setFormError(error?.response?.data?.message || error.message || 'Unable to create employee account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-view">
      <DashboardWelcomeToast message={welcomeMessage} />

      <section className="view-heading view-heading-split">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome to your HR Management System</p>
        </div>

        <div className="dashboard-header-actions">
          <button type="button" className="outline-action-button">
            <DocumentIcon />
            <span>Leave Desk</span>
          </button>
          <button type="button" className="primary-action-button" onClick={openCreateModal}>
            <PlusIcon />
            <span>Add Employee</span>
          </button>
        </div>
      </section>

      {successMessage ? (
        <div className="panel-message panel-message-success" role="status">
          {successMessage}
        </div>
      ) : null}

      {createdCredentials ? (
        <section className="credentials-panel">
          <div className="section-block-heading">
            <h2>Employee Login Credentials</h2>
            <p>Use these details on the employee login page.</p>
          </div>

          <div className="credentials-grid">
            <div className="credential-item">
              <span>Employee Name</span>
              <strong>{createdCredentials.name}</strong>
            </div>
            <div className="credential-item">
              <span>Employee ID</span>
              <strong>{createdCredentials.loginId}</strong>
            </div>
            <div className="credential-item">
              <span>Email</span>
              <strong>{createdCredentials.email}</strong>
            </div>
            <div className="credential-item">
              <span>Password</span>
              <strong>{createdCredentials.password}</strong>
            </div>
          </div>

          <p className="credential-hint">Portal path: Employee card on the main login page or `/employee-login`.</p>
        </section>
      ) : null}

      {pageError ? (
        <div className="panel-message panel-message-error" role="alert">
          {pageError}
        </div>
      ) : null}

      <section className="metrics-grid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const trendClass = card.trend.startsWith('-') ? 'metric-card-trend is-negative' : 'metric-card-trend';

          return (
            <article key={card.label} className="metric-card">
              <div className={`metric-card-icon tone-${card.tone}`}>
                <Icon />
              </div>
              <div className={trendClass}>{card.trend}</div>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </article>
          );
        })}
      </section>

      <section className="analytics-grid">
        <article className="analytics-card analytics-card-wide">
          <div className="analytics-card-header">
            <div>
              <h3>Employee Growth</h3>
              <p>Monthly employee count over time</p>
            </div>
          </div>
          <AnalyticsLineChart
            ariaLabel="Employee growth over time"
            data={growthData}
            minValue={350}
            maxValue={1400}
            yTicks={[350, 700, 1050, 1400]}
            height={320}
            paddingX={64}
            paddingTop={34}
            paddingBottom={44}
            showVerticalGuides
          />
        </article>

        <AttendanceBreakdownCard items={attendanceData} />
      </section>

      <section className="analytics-grid">
        <article className="analytics-card analytics-card-wide">
          <div className="analytics-card-header">
            <div>
              <h3>Workforce Snapshot</h3>
              <p>Key operating signals for HR decisions throughout the day</p>
            </div>
          </div>

          <div className="mini-stat-grid">
            {workforcePulse.map((item) => (
              <div key={item.label} className="mini-stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="analytics-card analytics-card-side">
          <div className="analytics-card-header">
            <div>
              <h3>Leave Approval Queue</h3>
              <p>Requests that need immediate HR attention</p>
            </div>
          </div>

          <div className="queue-list">
            {leaveQueue.map((item) => (
              <div key={`${item.name}-${item.request}`} className="queue-item">
                <div className="queue-meta">
                  <strong>{item.name}</strong>
                  <span>{item.request}</span>
                  <small>{item.team}</small>
                </div>
                <span className={`activity-status status-${item.tone}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="analytics-grid">
        <article className="table-card">
          <div className="section-block-heading">
            <h2>Recent Employees</h2>
            <p>Freshly created employee accounts and active workforce records</p>
          </div>

          <div className="employee-roster">
            <div className="employee-roster-head">
              <span>Name</span>
              <span>Employee ID</span>
              <span>Email</span>
              <span>Status</span>
              <span>Join Date</span>
            </div>

            {loadingEmployees ? (
              <div className="table-empty-state">Loading employees...</div>
            ) : recentEmployees.length === 0 ? (
              <div className="table-empty-state">No employees created yet. Use Add Employee to create the first one.</div>
            ) : (
              recentEmployees.map((employee) => (
                <article key={employee.id} className="employee-roster-row">
                  <div className="profiles-name">
                    <strong>{employee.name}</strong>
                    <span>{employee.designation}</span>
                  </div>
                  <span>{employee.employeeId}</span>
                  <span>{employee.email}</span>
                  <span
                    className={`activity-status status-${employee.status === 'Active' ? 'approved' : 'completed'}`}
                  >
                    {employee.status}
                  </span>
                  <span>{employee.joinDate}</span>
                </article>
              ))
            )}
          </div>
        </article>

        <article className="analytics-card analytics-card-side">
          <div className="analytics-card-header">
            <div>
              <h3>Hiring Pipeline</h3>
              <p>How current candidates are moving across stages</p>
            </div>
          </div>

          <div className="pipeline-list">
            {hiringPipeline.map((item) => (
              <div key={item.stage} className="pipeline-stage">
                <div className={`pipeline-count tone-${item.tone}`}>{item.count}</div>
                <div className="pipeline-copy">
                  <strong>{item.stage}</strong>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="activity-section">
        <div className="section-block-heading">
          <h2>Today's Priorities</h2>
          <p>Stay on top of approvals, onboarding, and workforce actions</p>
        </div>

        <div className="activity-list">
          {priorityItems.map((task) => (
            <article key={task.title} className="activity-item">
              <div className="activity-icon tone-violet">
                <CalendarIcon />
              </div>

              <div className="activity-copy">
                <strong>{task.title}</strong>
                <span>{task.description}</span>
              </div>

              <span className={`activity-status status-${task.tone}`}>{task.status}</span>
            </article>
          ))}
        </div>
      </section>

      {modalOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2 id="employee-modal-title">Create Employee Profile</h2>
                <p>Register a new employee account and save its login credentials in the backend.</p>
              </div>
              <button type="button" className="modal-close-button" onClick={closeModal}>
                x
              </button>
            </div>

            <form className="profile-form" onSubmit={handleCreateEmployee}>
              <label>
                <span>Full Name</span>
                <input name="name" value={draft.name} onChange={handleChange} placeholder="Ritika Sharma" required />
              </label>

              <label>
                <span>Designation</span>
                <input
                  name="designation"
                  value={draft.designation}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  required
                />
              </label>

              <label>
                <span>Employee ID</span>
                <input
                  name="employeeId"
                  value={draft.employeeId}
                  onChange={handleChange}
                  placeholder="EMP2401"
                  required
                />
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleChange}
                  placeholder="ritika@example.com"
                  required
                />
              </label>

              <label>
                <span>Role</span>
                <select name="role" value={draft.role} onChange={handleChange}>
                  <option>Team Member</option>
                  <option>Associate</option>
                  <option>Executive</option>
                  <option>Intern</option>
                </select>
              </label>

              <label>
                <span>Status</span>
                <select name="status" value={draft.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </label>

              <label>
                <span>Join Date</span>
                <input type="date" name="joinDate" value={draft.joinDate} onChange={handleChange} />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={draft.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  required
                />
              </label>

              {formError ? (
                <p className="profile-form-error" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="profile-form-actions">
                <button type="button" className="secondary-action-button" onClick={closeModal} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="primary-action-button" disabled={submitting}>
                  <span>{submitting ? 'Creating...' : 'Create Employee'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HRDashboard;
