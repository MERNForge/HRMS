function SvgIcon({ children, viewBox = '0 0 24 24', ...props }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BrandIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="4.5" y="4.5" width="6" height="6" rx="1.4" />
      <rect x="13.5" y="4.5" width="6" height="6" rx="1.4" />
      <rect x="4.5" y="13.5" width="6" height="6" rx="1.4" />
      <rect x="13.5" y="13.5" width="6" height="6" rx="1.4" />
    </SvgIcon>
  );
}

export function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </SvgIcon>
  );
}

export function SearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.2 16.2 3.3 3.3" />
    </SvgIcon>
  );
}

export function BellIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M6.5 9.5a5.5 5.5 0 1 1 11 0c0 5.1 2.1 6.7 2.1 6.7H4.4s2.1-1.6 2.1-6.7Z" />
      <path d="M10 19a2.4 2.4 0 0 0 4 0" />
    </SvgIcon>
  );
}

export function LogoutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 4.5H6.8A2.3 2.3 0 0 0 4.5 6.8v10.4a2.3 2.3 0 0 0 2.3 2.3H9" />
      <path d="M14 16.5 19 12l-5-4.5" />
      <path d="M11 12h8" />
    </SvgIcon>
  );
}

export function DashboardIcon(props) {
  return <BrandIcon {...props} />;
}

export function UsersIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M16.2 9.8a2.5 2.5 0 1 0 0-5" />
      <path d="M4.5 18.2c0-2.8 2.4-4.8 5.5-4.8s5.5 2 5.5 4.8" />
      <path d="M16 14.2c2.1 0 3.9 1.2 4.5 3.1" />
    </SvgIcon>
  );
}

export function CalendarIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.5" />
      <path d="M8 3.8v3.4" />
      <path d="M16 3.8v3.4" />
      <path d="M4.5 9.5h15" />
    </SvgIcon>
  );
}

export function DocumentIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M7.5 3.8h6.8l4.2 4.2v10.4A1.9 1.9 0 0 1 16.6 20H7.4a1.9 1.9 0 0 1-1.9-1.9V5.7A1.9 1.9 0 0 1 7.5 3.8Z" />
      <path d="M14.3 3.8v4.4h4.2" />
      <path d="M8.7 12h6.6" />
      <path d="M8.7 15.5h6.6" />
    </SvgIcon>
  );
}

export function WalletIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="3.8" y="6" width="16.4" height="12" rx="2.5" />
      <path d="M14 12h6.2" />
      <circle cx="14.4" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </SvgIcon>
  );
}

export function SettingsIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-2.1-1.2l-.4-2.7H10l-.4 2.7a7.6 7.6 0 0 0-2.1 1.2l-2.5-1-2 3.5 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.5 2.5-1a7.6 7.6 0 0 0 2.1 1.2L10 21h4l.4-2.7a7.6 7.6 0 0 0 2.1-1.2l2.5 1 2-3.5-2-1.6c.1-.4.1-.8.1-1.2Z" />
    </SvgIcon>
  );
}

export function ShieldIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.7 5.8 6.2v4.4c0 4.2 2.6 7.6 6.2 8.8 3.6-1.2 6.2-4.6 6.2-8.8V6.2L12 3.7Z" />
    </SvgIcon>
  );
}

export function ClockIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 8v4l2.8 1.8" />
    </SvgIcon>
  );
}

export function ChartIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5 18.5V9.8" />
      <path d="M10 18.5V5.5" />
      <path d="M15 18.5v-6.2" />
      <path d="M20 18.5v-9.8" />
    </SvgIcon>
  );
}

export function MailIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="4.5" y="6" width="15" height="12" rx="2.4" />
      <path d="m5.7 7.4 6.3 5 6.3-5" />
    </SvgIcon>
  );
}

export function PhoneIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8.2 5.2c.5-1 1.7-1.5 2.8-1.1l1.3.4c.9.3 1.5 1.1 1.5 2.1v1.3c0 .6.2 1.2.7 1.7l1.8 1.8c.4.4.9.7 1.5.7h1.6c1 0 1.9.7 2.1 1.7l.3 1.3c.3 1.1-.2 2.2-1.2 2.7l-1.1.6c-1.1.6-2.4.7-3.6.4A17.3 17.3 0 0 1 5.2 8.9c-.3-1.2-.1-2.5.5-3.5l.5-.2Z" />
    </SvgIcon>
  );
}

export function PlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </SvgIcon>
  );
}

export function EditIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="m4.8 16.8-.8 3.2 3.2-.8L18.5 7.9a1.8 1.8 0 0 0 0-2.6l-.8-.8a1.8 1.8 0 0 0-2.6 0L4.8 16.8Z" />
      <path d="m13.6 5.9 4.5 4.5" />
    </SvgIcon>
  );
}

export function TrashIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4.8 7h14.4" />
      <path d="M9.3 3.8h5.4" />
      <path d="M7 7v11a1.8 1.8 0 0 0 1.8 1.8h6.4A1.8 1.8 0 0 0 17 18V7" />
      <path d="M10 10.2v5.5" />
      <path d="M14 10.2v5.5" />
    </SvgIcon>
  );
}
