import AsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
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
    await generateToken(res, newUser._id);
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
    await generateToken(res, user._id);
    res.json({
      success: true,
      message: "Successfully logged in",
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      location: user.location,
      contact: user.contact,
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
      user.password = await bcrypt.hash(req.body.password, 10);
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
  res.status(200).json({ success: true, message: "Sad to see you go" });
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

// Apply for a Job
export const applyForJob = AsyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const userId = req.user._id;

  const alreadyApplied = await Jobs.findOne({
    _id: jobId,
    applications: userId,
  });

  if (alreadyApplied) {
    return res.status(400).json({
      success: false,
      message: "You have already applied for this job",
    });
  }

  const job = await Jobs.findByIdAndUpdate(
    jobId,
    { $push: { applications: userId } },
    { new: true }
  );

  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  res.status(200).json({
    success: true,
    message: "Application submitted successfully",
  });
});

// Get Jobs User Applied For
// Get Jobs User Applied For
export const getUserApplications = AsyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.find({ applications: req.user._id })
      .populate("applications", "firstname lastname email");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ success: false, message: "No applications found" });
    }

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

