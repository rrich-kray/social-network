const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  removeReaction,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
