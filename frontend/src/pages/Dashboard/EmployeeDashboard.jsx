import {
  CalendarIcon,
  ChartIcon,
  ClockIcon,
  DocumentIcon,
  WalletIcon,
} from './dashboardIcons';
import { readSessionUser } from '../../utils/session';
import DashboardWelcomeToast from './DashboardWelcomeToast';
import useWelcomeMessage from './useWelcomeMessage';

const employeeCards = [
  { value: '96%', label: 'Attendance', detail: 'This month', tone: 'green', icon: ChartIcon },
  { value: '3', label: 'Leave Balance', detail: 'Paid leaves left', tone: 'amber', icon: CalendarIcon },
  { value: '2', label: 'Open Requests', detail: 'Awaiting review', tone: 'blue', icon: ClockIcon },
  { value: '$4,200', label: 'Latest Salary', detail: 'March payroll', tone: 'purple', icon: WalletIcon },
];

const quickUpdates = [
  {
    title: 'Attendance marked successfully',
    text: 'Your check-in for today was recorded at 9:18 AM.',
    status: 'Completed',
    tone: 'completed',
    icon: ClockIcon,
  },
  {
    title: 'Leave request approved',
    text: 'Your leave request for April 4 was approved by HR.',
    status: 'Approved',
    tone: 'approved',
    icon: CalendarIcon,
  },
  {
    title: 'Payroll processed',
    text: 'Your latest salary slip is ready for download.',
    status: 'Completed',
    tone: 'completed',
    icon: WalletIcon,
  },
];

function EmployeeDashboard() {
  const user = readSessionUser();
  const welcomeMessage = useWelcomeMessage();

  return (
    <div className="admin-view">
      <DashboardWelcomeToast message={welcomeMessage} />

      <section className="view-heading">
        <h1>Employee Dashboard</h1>
        <p>Track your attendance, requests, payroll, and personal updates in one place</p>
      </section>

      <section className="stats-grid">
        {employeeCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="stat-card">
              <div className={`stat-card-icon tone-${card.tone}`}>
                <Icon />
              </div>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
              <small>{card.detail}</small>
            </article>
          );
        })}
      </section>

      <section className="analytics-grid">
        <article className="analytics-card analytics-card-wide">
          <div className="analytics-card-header">
            <div>
              <h3>My Profile Snapshot</h3>
              <p>Current employee details available in your active session</p>
            </div>
          </div>

          <div className="employee-summary-grid">
            <div className="employee-summary-card">
              <span>Name</span>
              <strong>{user?.name || 'Employee'}</strong>
            </div>
            <div className="employee-summary-card">
              <span>Employee ID</span>
              <strong>{user?.loginId || 'Not available'}</strong>
            </div>
            <div className="employee-summary-card">
              <span>Email</span>
              <strong>{user?.email || 'Not available'}</strong>
            </div>
            <div className="employee-summary-card">
              <span>Designation</span>
              <strong>{user?.designation || user?.profileRole || 'Team Member'}</strong>
            </div>
          </div>
        </article>

        <article className="analytics-card analytics-card-side">
          <div className="analytics-card-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Common actions your dashboard will support</p>
            </div>
          </div>

          <div className="employee-quick-actions">
            <button type="button" className="outline-action-button">
              <CalendarIcon />
              <span>Apply Leave</span>
            </button>
            <button type="button" className="outline-action-button">
              <DocumentIcon />
              <span>View Payslip</span>
            </button>
            <button type="button" className="outline-action-button">
              <ClockIcon />
              <span>Attendance Log</span>
            </button>
          </div>
        </article>
      </section>

      <section className="activity-section">
        <div className="section-block-heading">
          <h2>Recent Updates</h2>
          <p>Latest employee actions and HR communications</p>
        </div>

        <div className="activity-list">
          {quickUpdates.map((item) => {
            const Icon = item.icon;
            const toneClass = item.tone === 'approved' ? 'green' : item.tone === 'pending' ? 'amber' : 'purple';

            return (
              <article key={item.title} className="activity-item">
                <div className={`activity-icon tone-${toneClass}`}>
                  <Icon />
                </div>

                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>

                <span className={`activity-status status-${item.tone}`}>{item.status}</span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default EmployeeDashboard;
