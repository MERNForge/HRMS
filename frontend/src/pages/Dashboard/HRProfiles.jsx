import { useEffect, useMemo, useState } from 'react';
import {
  createHRAccount,
  deleteHRAccount,
  getHRAccounts,
  updateHRAccount,
} from '../../services/api';
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  ShieldIcon,
  TrashIcon,
} from './dashboardIcons';
import { readSessionUser, updateSessionUser } from '../../utils/session';

const today = new Date().toISOString().slice(0, 10);

const emptyProfile = {
  name: '',
  designation: 'Human Resources',
  employeeId: '',
  email: '',
  role: 'HR Manager',
  status: 'Active',
  joinDate: today,
  password: '',
  systemRole: 'hr',
};

function formatDate(value) {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return parsed.toISOString().slice(0, 10);
}

function mapAccountToProfile(user) {
  return {
    id: user._id,
    name: user.name || (user.role === 'admin' ? 'Admin' : user.loginId),
    designation: user.designation || (user.role === 'admin' ? 'Administrator' : 'Human Resources'),
    employeeId: user.loginId,
    email: user.email || 'No email provided',
    role: user.role === 'admin' ? 'Super Admin' : user.profileRole || 'HR Manager',
    status: user.isActive ? 'Active' : 'Inactive',
    joinDate: formatDate(user.joinDate || user.createdAt),
    systemRole: user.role,
  };
}

function HRProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyProfile);
  const [editingProfile, setEditingProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const [pageError, setPageError] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const metrics = useMemo(
    () => ({
      total: profiles.length,
      active: profiles.filter((profile) => profile.status === 'Active').length,
      superAdmins: profiles.filter((profile) => profile.role === 'Super Admin').length,
    }),
    [profiles]
  );

  const loadProfiles = async () => {
    setLoading(true);
    setPageError('');

    try {
      const response = await getHRAccounts();
      const backendProfiles = Array.isArray(response?.data) ? response.data.map(mapAccountToProfile) : [];
      setProfiles(backendProfiles);
    } catch (error) {
      setPageError(error?.response?.data?.message || error.message || 'Unable to load HR profiles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const openCreateModal = () => {
    setEditingProfile(null);
    setDraft(emptyProfile);
    setFormError('');
    setSuccessMessage('');
    setModalOpen(true);
  };

  const openEditModal = (profile) => {
    setEditingProfile(profile);
    setDraft({
      name: profile.name,
      designation: profile.designation,
      employeeId: profile.employeeId,
      email: profile.email,
      role: profile.role,
      status: profile.status,
      joinDate: profile.joinDate || today,
      password: '',
      systemRole: profile.systemRole,
    });
    setFormError('');
    setSuccessMessage('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setDraft(emptyProfile);
    setEditingProfile(null);
    setFormError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editingProfile && !draft.password.trim()) {
      setFormError('Password is required for HR account creation.');
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
      password: draft.password.trim() || undefined,
      profileRole: draft.systemRole === 'admin' ? 'Super Admin' : draft.role,
      status: draft.status,
      joinDate: draft.joinDate || today,
    };

    try {
      if (editingProfile) {
        const response = await updateHRAccount(editingProfile.id, payload);
        const currentUser = readSessionUser();

        if (currentUser?._id === editingProfile.id && response?.data) {
          updateSessionUser(response.data);
        }

        setSuccessMessage(`${payload.loginId.toUpperCase()} profile updated successfully.`);
      } else {
        await createHRAccount(payload);
        setSuccessMessage(`HR profile created. ${payload.loginId.toUpperCase()} can now log in from the HR portal.`);
      }

      await loadProfiles();
      closeModal();
    } catch (error) {
      setFormError(
        error?.response?.data?.message ||
          error.message ||
          `Unable to ${editingProfile ? 'update' : 'create'} HR profile.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (profile) => {
    const confirmed = window.confirm(`Delete ${profile.name} (${profile.employeeId})?`);
    if (!confirmed) {
      return;
    }

    setDeletingId(profile.id);
    setPageError('');
    setSuccessMessage('');

    try {
      await deleteHRAccount(profile.id);
      await loadProfiles();
      setSuccessMessage(`${profile.name} profile deleted successfully.`);
    } catch (error) {
      setPageError(error?.response?.data?.message || error.message || 'Unable to delete profile.');
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div className="admin-view">
      <section className="view-heading view-heading-split">
        <div>
          <h1>HR Profiles</h1>
          <p>Manage HR team members and their access credentials</p>
        </div>

        <button type="button" className="primary-action-button" onClick={openCreateModal}>
          <PlusIcon />
          <span>Create HR Profile</span>
        </button>
      </section>

      {successMessage ? (
        <div className="panel-message panel-message-success" role="status">
          {successMessage}
        </div>
      ) : null}

      {pageError ? (
        <div className="panel-message panel-message-error" role="alert">
          {pageError}
        </div>
      ) : null}

      <section className="stats-grid stats-grid-compact">
        <article className="stat-card stat-card-inline">
          <div className="stat-card-icon tone-blue">
            <ShieldIcon />
          </div>
          <div>
            <strong>{metrics.total}</strong>
            <span>Total HR Users</span>
          </div>
        </article>

        <article className="stat-card stat-card-inline">
          <div className="stat-card-icon tone-green">
            <MailIcon />
          </div>
          <div>
            <strong>{metrics.active}</strong>
            <span>Active Users</span>
          </div>
        </article>

        <article className="stat-card stat-card-inline">
          <div className="stat-card-icon tone-amber">
            <PhoneIcon />
          </div>
          <div>
            <strong>{metrics.superAdmins}</strong>
            <span>Super Admin</span>
          </div>
        </article>
      </section>

      <section className="table-card">
        <div className="profiles-table">
          <div className="profiles-table-head">
            <span>Name</span>
            <span>Employee ID</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Join Date</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div className="table-empty-state">Loading HR profiles...</div>
          ) : profiles.length === 0 ? (
            <div className="table-empty-state">No HR profiles found yet.</div>
          ) : (
            profiles.map((profile) => (
              <article key={profile.id} className="profiles-row">
                <div className="profiles-name">
                  <strong>{profile.name}</strong>
                  <span>{profile.designation}</span>
                </div>
                <span>{profile.employeeId}</span>
                <span>{profile.email}</span>
                <span className={`role-pill role-${profile.role === 'Super Admin' ? 'super' : 'manager'}`}>
                  {profile.role}
                </span>
                <span className={`activity-status status-${profile.status === 'Active' ? 'approved' : 'completed'}`}>
                  {profile.status}
                </span>
                <span>{profile.joinDate}</span>
                <div className="profile-row-actions">
                  <button
                    type="button"
                    className="action-icon-button action-edit"
                    title={`Edit ${profile.name}`}
                    onClick={() => openEditModal(profile)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    className="action-icon-button action-delete"
                    title={`Delete ${profile.name}`}
                    onClick={() => handleDelete(profile)}
                    disabled={deletingId === profile.id}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {modalOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={closeModal}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2 id="profile-modal-title">{editingProfile ? 'Edit Profile' : 'Create HR Profile'}</h2>
                <p>
                  {editingProfile
                    ? 'Update this account and save the changes in the backend.'
                    : 'Register a new HR account and save its login credentials in the backend.'}
                </p>
              </div>
              <button type="button" className="modal-close-button" onClick={closeModal}>
                x
              </button>
            </div>

            <form className="profile-form" onSubmit={handleSubmit}>
              <label>
                <span>Full Name</span>
                <input name="name" value={draft.name} onChange={handleChange} placeholder="Krish Oberoi" required />
              </label>

              <label>
                <span>Designation</span>
                <input
                  name="designation"
                  value={draft.designation}
                  onChange={handleChange}
                  placeholder="Manager"
                  required
                />
              </label>

              <label>
                <span>Employee ID</span>
                <input
                  name="employeeId"
                  value={draft.employeeId}
                  onChange={handleChange}
                  placeholder="HR060903"
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
                <select
                  name="role"
                  value={draft.role}
                  onChange={handleChange}
                  disabled={draft.systemRole === 'admin'}
                >
                  {draft.systemRole === 'admin' ? (
                    <option>Super Admin</option>
                  ) : (
                    <>
                      <option>HR Manager</option>
                      <option>Recruitment Lead</option>
                      <option>People Operations</option>
                    </>
                  )}
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
                <span>{editingProfile ? 'Password (optional)' : 'Password'}</span>
                <input
                  type="password"
                  name="password"
                  value={draft.password}
                  onChange={handleChange}
                  placeholder={editingProfile ? 'Leave blank to keep current password' : 'Create Password'}
                  required={!editingProfile}
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
                  <span>
                    {submitting
                      ? editingProfile
                        ? 'Saving...'
                        : 'Creating...'
                      : editingProfile
                        ? 'Save Changes'
                        : 'Create HR'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default HRProfiles;
