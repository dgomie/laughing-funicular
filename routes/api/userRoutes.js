const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  // addAssignment,
  // removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
// router.route('/:userId/thought').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:userId/thought/:thoughtId').delete(removeAssignment);

module.exports = router;