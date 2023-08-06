import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter User Name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please Enter Email id"],
    unique: [true, "email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password."],
    minlength: [6, "Password must be atleast 6 characters."],
    select: false,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

mongoose.models = {};

export const User = mongoose.model("User", schema);
