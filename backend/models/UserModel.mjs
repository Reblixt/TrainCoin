import mongoose from "mongoose";
//import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
  },
  email: {
    type: String,
    required: [true, "E-mail must be provided"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "dev"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  wallet: {
    type: String,
    required: [true, "Wallet must be provided"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.validatePassword = async function (passwordToCheck) {
  return await bcrypt.compare(passwordToCheck, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TTL,
  });
};

// userSchema.methods.createResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//
//   this.resetPasswordTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
//
//   return this.resetPasswordToken;
// };

export default mongoose.model("User", userSchema);
