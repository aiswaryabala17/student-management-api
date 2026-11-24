const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const {
  validateStudentRegistration,
  validateStudentUpdate
} = require('../middleware/validation');

// Specific stats route MUST come before param routes
router.get('/stats/summary', studentController.getStudentStats);

// Main CRUD Routes
router.post('/', validateStudentRegistration, studentController.registerStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', validateStudentUpdate, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
