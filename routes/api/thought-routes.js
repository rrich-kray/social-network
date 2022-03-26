const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  removeReaction,
  updateThought,
  deleteThought,
} = require("../../models/Thought");

router
  .route("/api/thoughts")
  .get(getAllThoughts)
  .get(getThoughtById)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/api/thoughts/:thoughtId/reactions")
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;
