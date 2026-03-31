require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const ensureAdminAccount = require('./utils/ensureAdminAccount');

const app = express();
const PORT = process.env.PORT || 8001;
const apiRoutes = [
  ['/api/v1/auth', authRoutes],
  ['/api/v1/departments', departmentRoutes],
  ['/api/v1/employees', employeeRoutes],
  ['/api/v1/leaves', leaveRoutes],
  ['/api/v1/attendance', attendanceRoutes],
  ['/api/v1/payroll', payrollRoutes],
  ['/api/v1/announcements', announcementRoutes],
];

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HRMS backend is running',
    docs: {
      login: 'POST /api/v1/auth/login',
      health: 'GET /health',
    },
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
  });
});

apiRoutes.forEach(([path, routeHandler]) => {
  app.use(path, routeHandler);
});

async function startServer() {
  try {
    await connectDB();
    await ensureAdminAccount();

    app.listen(PORT, () => {
      console.log(`server is running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.log('error occured while starting server', error.message);
    process.exit(1);
  }
}

startServer();
