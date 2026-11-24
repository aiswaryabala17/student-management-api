const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// MySQL Connection Pool Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'student_management_db',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool(dbConfig);
} catch (error) {
  console.error('Failed to initialize MySQL pool:', error.message);
}

/**
 * Test Database Connectivity
 */
async function testConnection() {
  try {
    if (!pool) return false;
    const connection = await pool.getConnection();
    console.log(`✅ Connected to MySQL Database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
    connection.release();
    isConnected = true;
    return true;
  } catch (error) {
    console.warn(`⚠️ MySQL Connection Notice: Could not connect to MySQL server (${error.code || error.message}).`);
    console.warn('   Ensure MySQL is running and credentials in .env are correct.');
    isConnected = false;
    return false;
  }
}

module.exports = {
  pool,
  testConnection,
  isDbConnected: () => isConnected,
  config: dbConfig
};
