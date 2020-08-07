const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const signupSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: true
  },
  isHirer: {
    type: Boolean,
    default: true
  }
});
signupSchema.methods.genAuthToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      isHirer: this.isHirer
    },
    "whiz"
  );
};
const Signup = mongoose.model("signup", signupSchema);

function validateSignup(user) {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(255)
      .trim()
      .required(),
    email: Joi.string()
      .min(3)
      .email()
      .max(255)
      .trim()
      .required(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}
module.exports.Signup = Signup;
module.exports.validate = validateSignup;
