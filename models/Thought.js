const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/formatDate");
const formatDate = require("../utils/formatDate");
const User = require("./User");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [280, "Please shorten your reaction"],
    },
    username: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      defatult: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Your thought cannot be empty!",
      minLength: [1, "Thought is too short"],
      maxlength: [280, "Please shorten your thought."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => formatDate(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

ThoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema); // first parameter is name of model
module.exports = Thought;

// In sequelize, you had to store a reference to the parent data's id with the child's data.
// in Mongoose, you can instruct the parent to keep track of the children
