import {
  CalendarIcon,
  ChartIcon,
  ClockIcon,
  ShieldIcon,
  UsersIcon,
  WalletIcon,
} from './dashboardIcons';
import DashboardWelcomeToast from './DashboardWelcomeToast';
import { AnalyticsLineChart, AttendanceBreakdownCard } from './dashboardCharts';
import useWelcomeMessage from './useWelcomeMessage';

const summaryCards = [
  { value: '2', label: 'HR Profiles', detail: 'Active Users', tone: 'violet', icon: ShieldIcon },
  { value: '1,248', label: 'Total Employees', detail: 'In Organization', tone: 'blue', icon: UsersIcon },
  { value: '12', label: 'Pending Approvals', detail: 'Awaiting Action', tone: 'amber', icon: ClockIcon },
  { value: '100%', label: 'System Status', detail: 'Operational', tone: 'green', icon: ChartIcon },
];

const metricsCards = [
  { value: '1,248', label: 'Total Employees', trend: '+12.5%', tone: 'blue', icon: UsersIcon },
  { value: '94.3%', label: 'Attendance Rate', trend: '+2.1%', tone: 'green', icon: UsersIcon },
  { value: '28', label: 'Pending Leaves', trend: '-5.2%', tone: 'amber', icon: CalendarIcon },
  { value: '$842K', label: 'Payroll Status', trend: '+8.3%', tone: 'purple', icon: WalletIcon },
];

const activityFeed = [
  {
    title: 'Sarah Johnson',
    text: 'requested 3 days sick leave',
    time: '2 minutes ago',
    status: 'Pending',
    tone: 'pending',
    icon: CalendarIcon,
  },
  {
    title: 'Michael Chen',
    text: 'joined the Engineering team',
    time: '1 hour ago',
    status: 'Approved',
    tone: 'approved',
    icon: UsersIcon,
  },
  {
    title: 'Emily Davis',
    text: 'vacation leave approved',
    time: '3 hours ago',
    status: 'Approved',
    tone: 'approved',
    icon: UsersIcon,
  },
  {
    title: 'System',
    text: 'monthly payroll processed',
    time: '5 hours ago',
    status: 'Completed',
    tone: 'completed',
    icon: WalletIcon,
  },
  {
    title: 'David Wilson',
    text: 'requested 1 day personal leave',
    time: '8 hours ago',
    status: 'Pending',
    tone: 'pending',
    icon: CalendarIcon,
  },
];

const attendanceData = [
  { label: 'Present', value: 1176, color: '#19b885' },
  { label: 'On Leave', value: 40, color: '#ff8b1a' },
  { label: 'Absent', value: 32, color: '#f04d4d' },
];

const chartData = [
  { month: 'Jan', value: 1040 },
  { month: 'Feb', value: 1060 },
  { month: 'Mar', value: 1065 },
  { month: 'Apr', value: 1080 },
  { month: 'May', value: 1100 },
  { month: 'Jun', value: 1160 },
  { month: 'Jul', value: 1190 },
].map((item) => ({ ...item, label: item.month }));

function AdminDashboard() {
  const welcomeMessage = useWelcomeMessage();

  return (
    <div className="admin-view">
      <DashboardWelcomeToast message={welcomeMessage} />

      <section className="view-heading">
        <h1>Admin Dashboard</h1>
        <p>Manage your HR system and organization</p>
      </section>

      <section className="stats-grid">
        {summaryCards.map((card) => {
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

      <section className="section-block">
        <div className="section-block-heading">
          <h2>Organization Metrics</h2>
        </div>

        <div className="metrics-grid">
          {metricsCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.label} className="metric-card">
                <div className={`metric-card-icon tone-${card.tone}`}>
                  <Icon />
                </div>
                <div className="metric-card-trend">{card.trend}</div>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
              </article>
            );
          })}
        </div>
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
            data={chartData}
            minValue={0}
            maxValue={1200}
            yTicks={[0, 300, 600, 900, 1200]}
          />
        </article>

        <AttendanceBreakdownCard items={attendanceData} />
      </section>

      <section className="activity-section">
        <div className="section-block-heading">
          <h2>Recent Activity</h2>
          <p>Latest updates and actions</p>
        </div>

        <div className="activity-list">
          {activityFeed.map((item) => {
            const Icon = item.icon;
            const toneClass =
              item.tone === 'completed' ? 'purple' : item.tone === 'approved' ? 'green' : 'amber';

            return (
              <article key={`${item.title}-${item.time}`} className="activity-item">
                <div className={`activity-icon tone-${toneClass}`}>
                  <Icon />
                </div>

                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                  <small>{item.time}</small>
                </div>

                <span className={`activity-status status-${item.tone}`}>{item.status}</span>
              </article>
            );
          })}

          <button type="button" className="activity-link">
            View All Activity
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
