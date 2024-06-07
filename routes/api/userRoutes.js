const router = require('express').Router();
const {
  // getStudents,
  // getSingleStudent,
  // createStudent,
  // deleteStudent,
  // addAssignment,
  // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getStudents).post(createStudent);

// /api/users/:userId
router.route('/:userId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:userId/thought').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/thought/:thoughtId').delete(removeAssignment);

module.exports = router;