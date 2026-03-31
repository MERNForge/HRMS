import {
  BrandIcon,
  CalendarIcon,
  DashboardIcon,
  DocumentIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
} from './dashboardIcons';
import WorkspaceLayout from './WorkspaceLayout';

const navigation = [
  { label: 'Dashboard', path: '/dashboard/admin', icon: DashboardIcon },
  { label: 'HR Profiles', path: '/dashboard/admin/hr-profiles', icon: UsersIcon },
  { label: 'Employees', icon: UsersIcon },
  { label: 'Attendance', icon: CalendarIcon },
  { label: 'Leave Management', icon: DocumentIcon },
  { label: 'Payroll', icon: WalletIcon },
  { label: 'Settings', icon: SettingsIcon },
];

function getAdminRoleLabel() {
  return 'Administrator';
}

function AdminWorkspaceLayout() {
  return (
    <WorkspaceLayout
      navigation={navigation}
      brandIcon={BrandIcon}
      brandSubtitle="Management Suite"
      navigationLabel="Admin navigation"
      searchLabel="Search employees or records"
      searchPlaceholder="Search employees, records..."
      logoutPath="/admin-login"
      defaultName="Admin User"
      getRoleLabel={getAdminRoleLabel}
    />
  );
}

export default AdminWorkspaceLayout;
