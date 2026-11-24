const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection, isDbConnected } = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome & API Documentation discovery route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Student Management REST API',
    version: '1.0.0',
    developer: 'U B Aiswarya',
    module: 'Module 03 - Week 3 Deliverable',
    database_status: isDbConnected() ? 'Connected (MySQL)' : 'Running (In-Memory Fallback)',
    endpoints: {
      health: 'GET /api/health',
      register_student: 'POST /api/students',
      retrieve_all_students: 'GET /api/students',
      retrieve_student_by_id: 'GET /api/students/:id',
      update_student: 'PUT /api/students/:id',
      delete_student: 'DELETE /api/students/:id',
      student_stats: 'GET /api/students/stats/summary'
    }
  });
});

// Health check endpoint (for DB verification)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: `${process.uptime().toFixed(1)}s`,
    timestamp: new Date().toISOString(),
    database: {
      connected: isDbConnected(),
      engine: isDbConnected() ? 'MySQL' : 'Memory'
    }
  });
});

// API Routes
app.use('/api/students', studentRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(`🚀 Student Management REST API is running on port ${PORT}`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`====================================================`);

  // Test Database Connectivity
  await testConnection();
});

module.exports = { app, server };
