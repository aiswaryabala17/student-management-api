/**
 * Student Request Validation Middleware
 */

const validateStudentRegistration = (req, res, next) => {
  const { id, full_name, email, phone, dob, gender, department, semester, cgpa } = req.body;
  const errors = [];

  if (!id || typeof id !== 'string' || !id.trim()) {
    errors.push('Student ID (id) is required.');
  }

  if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 3) {
    errors.push('Full name (full_name) is required and must be at least 3 characters.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address (email) is required.');
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(String(phone).replace(/[\s-]/g, ''))) {
    errors.push('Phone number (phone) must be a 10-digit number.');
  }

  if (!dob || isNaN(Date.parse(dob))) {
    errors.push('A valid Date of Birth (dob: YYYY-MM-DD) is required.');
  }

  const allowedGenders = ['Male', 'Female', 'Other'];
  if (!gender || !allowedGenders.includes(gender)) {
    errors.push(`Gender must be one of: ${allowedGenders.join(', ')}.`);
  }

  if (!department || typeof department !== 'string' || !department.trim()) {
    errors.push('Department (department) is required.');
  }

  if (!semester || typeof semester !== 'string' || !semester.trim()) {
    errors.push('Semester (semester) is required.');
  }

  if (cgpa !== undefined && cgpa !== null && cgpa !== '') {
    const num = parseFloat(cgpa);
    if (isNaN(num) || num < 0 || num > 10) {
      errors.push('CGPA must be a decimal between 0.00 and 10.00.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors
    });
  }

  next();
};

const validateStudentUpdate = (req, res, next) => {
  const { email, phone, dob, gender, cgpa } = req.body;
  const errors = [];

  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Provided email is invalid.');
    }
  }

  if (phone !== undefined) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(String(phone).replace(/[\s-]/g, ''))) {
      errors.push('Provided phone number must be 10 digits.');
    }
  }

  if (dob !== undefined && isNaN(Date.parse(dob))) {
    errors.push('Provided Date of Birth is invalid.');
  }

  if (gender !== undefined && !['Male', 'Female', 'Other'].includes(gender)) {
    errors.push('Gender must be Male, Female, or Other.');
  }

  if (cgpa !== undefined && cgpa !== null && cgpa !== '') {
    const num = parseFloat(cgpa);
    if (isNaN(num) || num < 0 || num > 10) {
      errors.push('CGPA must be between 0.00 and 10.00.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors
    });
  }

  next();
};

module.exports = {
  validateStudentRegistration,
  validateStudentUpdate
};
