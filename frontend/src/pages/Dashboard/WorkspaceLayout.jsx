import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BellIcon, LogoutIcon, MenuIcon, SearchIcon } from './dashboardIcons';
import {
  clearSession,
  getDisplayName,
  getInitials,
  readSessionUser,
  SESSION_USER_UPDATED_EVENT,
} from '../../utils/session';
import './dashboard.css';

function buildWorkspaceUser(defaultName, getRoleLabel) {
  const savedUser = readSessionUser();

  return {
    name: getDisplayName(savedUser, defaultName),
    role: getRoleLabel(savedUser),
  };
}

function WorkspaceLayout({
  navigation,
  brandIcon: BrandIcon,
  brandSubtitle,
  navigationLabel,
  searchLabel,
  searchPlaceholder,
  logoutPath,
  defaultName,
  getRoleLabel,
}) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => buildWorkspaceUser(defaultName, getRoleLabel));

  const initials = useMemo(() => getInitials(user.name), [user.name]);

  useEffect(() => {
    const syncUser = () => {
      setUser(buildWorkspaceUser(defaultName, getRoleLabel));
    };

    window.addEventListener('storage', syncUser);
    window.addEventListener(SESSION_USER_UPDATED_EVENT, syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener(SESSION_USER_UPDATED_EVENT, syncUser);
    };
  }, [defaultName, getRoleLabel]);

  const handleLogout = () => {
    clearSession();
    navigate(logoutPath, { replace: true });
  };

  return (
    <div className="workspace-shell">
      <aside className={`workspace-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="workspace-brand">
          <div className="workspace-brand-icon">
            <BrandIcon />
          </div>
          <div>
            <strong>HRMS Pro</strong>
            <span>{brandSubtitle}</span>
          </div>
        </div>

        <nav className="workspace-nav" aria-label={navigationLabel}>
          {navigation.map((item) => {
            const Icon = item.icon;

            if (!item.path) {
              return (
                <button key={item.label} type="button" className="workspace-nav-item is-muted">
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === navigation[0]?.path}
                className={({ isActive }) => `workspace-nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="workspace-sidebar-footer">
          <div className="workspace-avatar workspace-avatar-small">{initials}</div>
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          className="workspace-sidebar-backdrop"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <div className="workspace-main">
        <header className="workspace-topbar">
          <button
            type="button"
            className="workspace-icon-button"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <MenuIcon />
          </button>

          <label className="workspace-search" aria-label={searchLabel}>
            <SearchIcon />
            <input type="search" placeholder={searchPlaceholder} />
          </label>

          <div className="workspace-toolbar">
            <div className="workspace-welcome">
              <span>Welcome back,</span>
              <strong>{user.name}</strong>
            </div>

            <button type="button" className="workspace-icon-button workspace-bell" aria-label="Notifications">
              <BellIcon />
              <span className="workspace-notification-dot" />
            </button>

            <button
              type="button"
              className="workspace-avatar workspace-avatar-button"
              onClick={() => setProfileMenuOpen((open) => !open)}
              aria-expanded={profileMenuOpen}
            >
              {initials}
            </button>
          </div>

          {profileMenuOpen ? (
            <div className="workspace-profile-menu">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
              <button type="button" onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          ) : null}
        </header>

        <main className="workspace-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
