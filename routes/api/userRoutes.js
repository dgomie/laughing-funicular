const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
//TODO Add PUT route
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userID/friends
// router.route('/:userId/friends').get(getAllFriends)

// /api/users/:userID/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)




module.exports = router;