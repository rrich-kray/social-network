const { User } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((response) => res.json(response))
      .catch((err) => res.status(404).json({ message: "No users found" }));
  },

  getUserById({ params }, res) {
    User.finOne({ _id: params.id })
      .then((response) => res.json(response))
      .catch((err) => res.status(404).json({ message: "User not found" }));
  },

  // create user
  CreateUser({ body }, res) {
    User.create(body)
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json({ message: err.message }));
  },

  // Update User
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json({ message: err.message }));
  },

  // Delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json({ message: err }));
  },
};

module.exports = userController;
