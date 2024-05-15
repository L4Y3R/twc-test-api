const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static register method
userSchema.statics.register = async function (email, password) {
  // check if all the fields are filled
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }

  // is the email valid
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid Email");
  }

  // is the password strong
  if (!validator.isStrongPassword(password)) {
    throw Error("Your password is not strong enough");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw Error("Email already in use");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // check all the fields are filled
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Credentials");
  }

  // compare if passwrods match
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Credentials");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
