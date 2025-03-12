import { mongoose, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { application } from "express";

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "company_manager", "user"],
      default: "user",
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    cvUrl: {
      type: String,
    },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
    
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.omitField = function (fields) {
  const user = this.toObject(); // Convert Mongoose document to plain JavaScript object

  // Ensure fields is an array
  const fieldsToOmit = Array.isArray(fields) ? fields : [fields];

  fieldsToOmit.forEach((field) => {
    delete user[field]; // Delete each specified field
  });

  return user; // Return the modified object without the omitted fields
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
