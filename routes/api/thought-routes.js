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

router.route("/").get(getAllThoughts);

router.route("/:userId").post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:id/reactions").post(addReaction);

router.route("/:id/reactions/:reactionId").delete(removeReaction);

module.exports = router;
