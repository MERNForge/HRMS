export const SESSION_USER_UPDATED_EVENT = 'session-user-updated';

function getReadableNameFromEmail(email) {
  const emailName = email?.split('@')[0];

  if (!emailName) {
    return '';
  }

  return emailName
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

export function readSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    return null;
  }
}

export function saveSession(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  notifySessionUserUpdated();
}

export function updateSessionUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
  notifySessionUserUpdated();
}

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  notifySessionUserUpdated();
}

export function notifySessionUserUpdated() {
  window.dispatchEvent(new Event(SESSION_USER_UPDATED_EVENT));
}

export function getDisplayName(user, fallbackName = 'User') {
  return user?.name || getReadableNameFromEmail(user?.email) || fallbackName;
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
