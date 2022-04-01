const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatDate");
const Thought = require("./Thought");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please provide a username!"],
      maxLength: [50, "Please shorten your username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address!"],
      unique: true,
      // match: "/^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/",
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: this,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("User", UserSchema);
module.exports = User;
