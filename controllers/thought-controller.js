const { Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllthoughts(req, res) {
    Thought.find({}).populate();
  },
};
