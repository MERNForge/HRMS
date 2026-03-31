import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import AdminLogin from './pages/Auth/AdminLogin';
import HRLogin from './pages/Auth/HRLogin';
import EmployeeLogin from './pages/Auth/EmployeeLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AdminWorkspaceLayout from './pages/Dashboard/AdminWorkspaceLayout';
import HRProfiles from './pages/Dashboard/HRProfiles';
import HRDashboard from './pages/Dashboard/HRDashboard';
import HRWorkspaceLayout from './pages/Dashboard/HRWorkspaceLayout';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import EmployeeWorkspaceLayout from './pages/Dashboard/EmployeeWorkspaceLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/portal" element={<Navigate to="/" replace />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/dashboard/admin" element={<AdminWorkspaceLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hr-profiles" element={<HRProfiles />} />
        </Route>
        <Route path="/dashboard/hr" element={<HRWorkspaceLayout />}>
          <Route index element={<HRDashboard />} />
        </Route>
        <Route path="/dashboard/employee" element={<EmployeeWorkspaceLayout />}>
          <Route index element={<EmployeeDashboard />} />
        </Route>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
