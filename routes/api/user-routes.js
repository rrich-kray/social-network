const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../models/User");

router
  .route("/api/users")
  .get(getAllUsers)
  .get(getUserById)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/api/users/:userId/friends/:friendId");

module.exports = router;
