import AsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Jobs from "../models/JobsModel.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const RegisterUser = AsyncHandler(async (req, res) => {
  const { firstname, lastname, password, location, contact, role, email } =
    req.body;

  if (!firstname || !lastname || !email || !password || !location || !contact) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password,
    location,
    contact,
    role,
  });

  if (newUser) {
    generateToken(res, newUser._id);
    res.status(201).json({ success: true, data: newUser });
  } else {
    res.status(400);
    throw new Error("Registration unsuccessful");
  }
});

// Login User
export const Login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      success: true,
      message: "Successfully logged in",
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      location: user.location,
      contact : user.contact
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Get User Profile
export const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json({ success: true, message: "User profile info", data: user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update User Profile
export const updateProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;
    user.contact = req.body.contact || user.contact;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        location: updatedUser.location,
        contact: updatedUser.contact,
        role: updatedUser.role,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Logout User
export const logoutUser = AsyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Sad to see you go" });
});

// Check User Role
export const CheckRole = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({ success: true, role: user.role });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get Jobs User Applied For
export const getUserApplications = AsyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.find({ application: req.user._id }).populate(
      "userId",
      "firstname lastname email"
    );

    res.status(200).json({
      success: true,
      message: "Jobs user has applied for",
      data: jobs,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
