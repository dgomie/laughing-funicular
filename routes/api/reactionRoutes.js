const router = require('express').Router();
const {
  // getStudents,
  // getSingleStudent,
  // createStudent,
  // deleteStudent,
  // addAssignment,
  // removeAssignment,
} = require('../../controllers/reactionController');

// /api/users
router.route('/').get(getStudents).post(createStudent);

// /api/users/:userId
router.route('/:reactionId').get(getSingleStudent).delete(deleteStudent);

module.exports = router;