-- ============================================================================
-- Student Management System Database Schema
-- Developed for Module 03: Node.js, Express.js & MySQL REST API
-- ============================================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS student_management_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE student_management_db;

-- 2. Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  department VARCHAR(100) NOT NULL,
  semester VARCHAR(50) NOT NULL,
  cgpa DECIMAL(3, 2) DEFAULT NULL,
  status ENUM('Active', 'Graduated', 'On Leave') DEFAULT 'Active',
  address VARCHAR(255) DEFAULT NULL,
  admission_date DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dept (department),
  INDEX idx_email (email),
  INDEX idx_name (full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Insert Initial Starter Seed Data
INSERT INTO students (id, full_name, email, phone, dob, gender, department, semester, cgpa, status, address, admission_date)
VALUES
  ('STU-2024-001', 'Aarav Sharma', 'aarav.sharma@example.com', '9876543210', '2003-05-14', 'Male', 'Computer Science & Engineering', 'Semester 6', 8.90, 'Active', 'Bengaluru, Karnataka', '2023-08-10'),
  ('STU-2024-002', 'U B Aiswarya', 'aiswarya.ub@example.com', '9123456780', '2004-03-22', 'Female', 'Information Technology', 'Semester 8', 9.20, 'Active', 'Chennai, Tamil Nadu', '2023-08-01'),
  ('STU-2024-003', 'Rohan Varma', 'rohan.varma@example.com', '9845123456', '2003-11-09', 'Male', 'Electronics & Communication', 'Semester 6', 8.40, 'Active', 'Hyderabad, Telangana', '2023-08-12'),
  ('STU-2024-004', 'Pooja Hegde', 'pooja.hegde@example.com', '9731245678', '2004-07-19', 'Female', 'Computer Science & Engineering', 'Semester 4', 8.70, 'Active', 'Mangalore, Karnataka', '2024-08-05'),
  ('STU-2024-005', 'Karthik Nair', 'karthik.nair@example.com', '9447123987', '2002-12-30', 'Male', 'Data Science & AI', 'Semester 8', 9.00, 'Active', 'Kochi, Kerala', '2023-07-28')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
