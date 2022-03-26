const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../../pizza-hunt/utils/dateFormat");
const formatDate = require("../utils/formatDate");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    defatult: Date.now,
    get: (createdAtVal) => formatDate(createdAtVal),
  },
});

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: "Your thought cannot be empty!",
    minLength: 1,
    maxlength: 280,
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
  reactions: {
    type: Schema.Types.ObjectId,
    ref: "ReactionSchema",
  },
});

ThoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);
module.exports = Thought;
