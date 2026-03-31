import axios from 'axios';
import { clearSession } from '../utils/session';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((request) => {
  const token = localStorage.getItem('token');

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.response?.status === 401) {
      clearSession();
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);

export const login = (data) => apiClient.post('/auth/login', data);
export const register = (data) => apiClient.post('/auth/register', data);
export const getHRAccounts = () => apiClient.get('/auth/hr-accounts');
export const getEmployeeAccounts = () => apiClient.get('/auth/employee-accounts');
export const createHRAccount = (data) => apiClient.post('/auth/create-hr', data);
export const createEmployeeAccount = (data) => apiClient.post('/auth/create-employee', data);
export const updateHRAccount = (id, data) => apiClient.put(`/auth/hr-accounts/${id}`, data);
export const deleteHRAccount = (id) => apiClient.delete(`/auth/hr-accounts/${id}`);

export const getDepartments = () => apiClient.get('/departments');
export const createDepartment = (data) => apiClient.post('/departments/create', data);

export const getEmployees = () => apiClient.get('/employees');
export const getEmployeeProfile = (id) => apiClient.get(`/employees/${id}`);
export const createEmployeeProfile = (data) => apiClient.post('/employees/create', data);

export const checkIn = () => apiClient.post('/attendance/check-in');
export const checkOut = () => apiClient.post('/attendance/check-out');

export const applyLeave = (data) => apiClient.post('/leaves/apply', data);
export const getMyLeaves = () => apiClient.get('/leaves/my-leaves');
export const getAllLeaves = () => apiClient.get('/leaves');
export const updateLeaveStatus = (id, status) => apiClient.put(`/leaves/${id}/status`, { status });

export const getPayrollRecords = () => apiClient.get('/payroll');
export const createPayroll = (data) => apiClient.post('/payroll/create', data);

export const getAnnouncements = () => apiClient.get('/announcements');
export const postAnnouncement = (data) => apiClient.post('/announcements/create', data);

export default apiClient;
