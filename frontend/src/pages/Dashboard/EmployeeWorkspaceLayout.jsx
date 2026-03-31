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
  { label: 'Dashboard', path: '/dashboard/employee', icon: DashboardIcon },
  { label: 'Attendance', icon: CalendarIcon },
  { label: 'Leave Requests', icon: DocumentIcon },
  { label: 'Payroll', icon: WalletIcon },
  { label: 'Profile', icon: UsersIcon },
  { label: 'Settings', icon: SettingsIcon },
];

function getEmployeeRoleLabel(user) {
  return user?.designation || user?.profileRole || 'Team Member';
}

function EmployeeWorkspaceLayout() {
  return (
    <WorkspaceLayout
      navigation={navigation}
      brandIcon={UsersIcon}
      brandSubtitle="Employee Self Service"
      navigationLabel="Employee navigation"
      searchLabel="Search records"
      searchPlaceholder="Search payslips, leave records..."
      logoutPath="/employee-login"
      defaultName="Employee"
      getRoleLabel={getEmployeeRoleLabel}
    />
  );
}

export default EmployeeWorkspaceLayout;
