const { Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllthoughts(req, res) {
    Thought.find({})
      .populate({
        path: "Reactions",
        select: "__v",
      })
      .select("__v")
      .then((response) => {
        if (!response) res.json({ message: "No Thoughts found!" });
        res.json(response);
      })
      .catch((err) => res.status(404).json({ message: err.message }));
  },

  // Get single thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "Reactions",
        select: "__v",
      })
      .select("__v")
      .then((response) => {
        if (!response) {
          res.json({ message: "Thought not found" });
          return;
        }
        res.json(response);
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  },

  // Create thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((response) => {
        if (!response) {
          res.json({ message: "Could not create thought" });
          return;
        }
        res.json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: "Something went wrong" });
          return;
        }
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Remove reply
  removeReaction({ params, body }, res) {
    Thought.findOneAndDelete(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((response) => {
        if (!response) {
          res.status(404).json({ message: "Could not find Reaction!" });
          return;
        }
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((response) => {
        if (!response) {
          res.json({ message: "Could not create Thought" });
          return;
        }
        res.json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((response) => {
        if (!response) {
          res.json({ message: "Could not delete thought" });
          return;
        }
        res.json(response);
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },
};
