import {
  CalendarIcon,
  DashboardIcon,
  DocumentIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from './dashboardIcons';
import WorkspaceLayout from './WorkspaceLayout';

const navigation = [
  { label: 'Dashboard', path: '/dashboard/hr', icon: DashboardIcon },
  { label: 'Employees', icon: UsersIcon },
  { label: 'Attendance', icon: CalendarIcon },
  { label: 'Leave Management', icon: DocumentIcon },
  { label: 'Payroll', icon: WalletIcon },
  { label: 'Settings', icon: SettingsIcon },
];

function getHRRoleLabel(user) {
  return user?.profileRole || user?.designation || 'HR Manager';
}

function HRWorkspaceLayout() {
  return (
    <WorkspaceLayout
      navigation={navigation}
      brandIcon={UsersIcon}
      brandSubtitle="Management Suite"
      navigationLabel="HR navigation"
      searchLabel="Search employees or requests"
      searchPlaceholder="Search employees, requests..."
      logoutPath="/hr-login"
      defaultName="HR User"
      getRoleLabel={getHRRoleLabel}
    />
  );
}

export default HRWorkspaceLayout;
