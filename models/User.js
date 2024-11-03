const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// SalesAgent Schema
const salesAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  commissionRate: Number,
  passwordCRM: String,
  company: String,
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin","salesagent"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    salesAgent: {
      type: salesAgentSchema,
      required: function () {
        return this.role === "salesagent";
      },
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
userSchema.pre("save", function () {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
});

// User methods
userSchema.methods.isActived = function () {
  return this.isActive;
};

userSchema.methods.isChangedPassword = function (jwtDate) {
  if (this.resetPasswordAt) {
    return parseInt(this.resetPasswordAt.getTime()) / 1000 > jwtDate;
  }
  return false;
};

userSchema.methods.isPasswordMatched = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.Activate = async function () {
  this.isActive = true;
};

userSchema.methods.nonActivate = function () {
  this.isActive = false;
};

// Export the models
module.exports = {
  User: mongoose.model("User", userSchema),
  SalesAgent: mongoose.model("SalesAgent", salesAgentSchema),
};
