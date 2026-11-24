const StudentModel = require('../models/studentModel');

/**
 * Controller: Register a new student
 * POST /api/students
 */
exports.registerStudent = async (req, res, next) => {
  try {
    const { id, email } = req.body;

    // Check if ID already exists
    const existingById = await StudentModel.getById(id);
    if (existingById) {
      return res.status(409).json({
        success: false,
        message: `Student with ID '${id}' already exists.`
      });
    }

    // Check if Email already exists
    const existingByEmail = await StudentModel.getByEmail(email);
    if (existingByEmail) {
      return res.status(409).json({
        success: false,
        message: `Student with email '${email}' is already registered.`
      });
    }

    const createdStudent = await StudentModel.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully.',
      data: createdStudent
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Retrieve all students (with optional query filters)
 * GET /api/students
 */
exports.getAllStudents = async (req, res, next) => {
  try {
    const { search, department, sortBy } = req.query;

    const students = await StudentModel.getAll({
      search,
      department,
      sortBy
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Retrieve a single student by ID
 * GET /api/students/:id
 */
exports.getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.getById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student record with ID '${id}' was not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Update an existing student record
 * PUT /api/students/:id
 */
exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingStudent = await StudentModel.getById(id);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: `Student record with ID '${id}' was not found.`
      });
    }

    // If updating email, check for duplicate email conflicts
    if (req.body.email && req.body.email.toLowerCase() !== existingStudent.email.toLowerCase()) {
      const emailConflict = await StudentModel.getByEmail(req.body.email);
      if (emailConflict && emailConflict.id !== id) {
        return res.status(409).json({
          success: false,
          message: `Email '${req.body.email}' is already in use by another student.`
        });
      }
    }

    const updatedStudent = await StudentModel.update(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Student details updated successfully.',
      data: updatedStudent
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Delete a student record
 * DELETE /api/students/:id
 */
exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await StudentModel.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Student with ID '${id}' does not exist.`
      });
    }

    await StudentModel.delete(id);

    res.status(200).json({
      success: true,
      message: `Student '${existing.full_name}' (${id}) was deleted successfully.`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller: Get summary statistics
 * GET /api/students/stats/summary
 */
exports.getStudentStats = async (req, res, next) => {
  try {
    const stats = await StudentModel.getStats();

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};
