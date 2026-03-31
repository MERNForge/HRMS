function AdminIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.3 5.2 6.2v4.7c0 4.2 2.8 8 6.8 9.1 4-1.1 6.8-4.9 6.8-9.1V6.2L12 3.3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9.3 11.9 1.8 1.8 3.8-3.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HRIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.4 11a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Zm7 .5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6 18.3c0-2.4 2-4.2 4.6-4.2h.2c2.6 0 4.7 1.8 4.7 4.2M14.6 17.5c.5-1.2 1.8-1.9 3.2-1.9 1.6 0 2.9.8 3.6 2.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmployeeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 10.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2 19.1c0-3 3-5.2 6.8-5.2s6.8 2.2 6.8 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const portals = [
  {
    role: 'employee',
    label: 'EMPLOYEE PORTAL',
    status: 'User Access',
    title: 'Employee Login',
    description:
      'Login using your Employee ID and password to access your profile, leave details, attendance, and salary records.',
    features: ['Attendance history', 'Leave requests'],
    loginPath: '/employee-login',
    primaryColor: '#3478f0',
    secondaryColor: '#1ca8d5',
    shadowColor: 'rgba(28, 168, 213, 0.2)',
    icon: <EmployeeIcon />,
  },
  {
    role: 'hr',
    label: 'WORKFORCE MANAGEMENT',
    status: 'HR Access',
    title: 'HR Login',
    description:
      'Access for HR personnel to manage employees, approve leave requests, track attendance, and handle recruitment.',
    features: ['Recruitment flow', 'People operations'],
    loginPath: '/hr-login',
    primaryColor: '#953bef',
    secondaryColor: '#ed3f97',
    shadowColor: 'rgba(217, 63, 151, 0.22)',
    icon: <HRIcon />,
  },
  {
    role: 'admin',
    label: 'SYSTEM CONTROL',
    status: 'Full Access',
    title: 'Admin Login',
    description:
      'Full system access for administrators. Manage users, departments, payroll analytics, and system-wide settings.',
    features: ['Access policies', 'Payroll analytics'],
    loginPath: '/admin-login',
    primaryColor: '#5f5cf7',
    secondaryColor: '#8f39ff',
    shadowColor: 'rgba(95, 92, 247, 0.22)',
    icon: <AdminIcon />,
  },
];
