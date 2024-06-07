const router = require('express').Router();
const {
  // getStudents,
  // getSingleStudent,
  // createStudent,
  // deleteStudent,
  // addAssignment,
  // removeAssignment,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getStudents).post(createStudent);

// /api/thoughts/:thoughtId
router.route('/:userId').get(getSingleStudent).delete(deleteStudent);

// /api/thoughts/:studentId/assignments
router.route('/:userId/thought').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/thought/:thoughtId').delete(removeAssignment);

module.exports = router;