import { CONFLICT, UNAUTHORIZED } from "../constants/http.codes.js";
import Jobs from "../models/JobsModel.js";
import User from "../models/UserModel.js";
import { HttpError } from "../utils/HttpError.js";

export const registerUser = async(userData) => {
const { firstname, lastname, password, location, contact, role, email } =
  userData;

   const userExist = await User.findOne({ email });

   if (userExist) {
 throw new HttpError("Email already exists", CONFLICT); 
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

return newUser;
}

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    // return next(new HttpError("Incorrect email or password"), UNAUTHORIZED);
    throw new HttpError("Invalid login details", UNAUTHORIZED);
  }
  // Check if user exists

  return user;
};



export const updateProfile = async (updateData) => {
  const {
    userId, // ID of the user to update
    firstname,
    lastname,
    email,
    location,
    contact,
    role,
    password,
    oldPassword, // Required for password updates
  } = updateData;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  // Update fields if provided
  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (email) {
    // Check if the new email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id.toString() !== userId) {
      throw new HttpError("Email already in use", CONFLICT);
    }
    user.email = email;
  }
  if (location) user.location = location;
  if (contact) user.contact = contact;
  if (role) user.role = role;

  // Update password if provided
  if (password) {
    if (!oldPassword) {
      throw new HttpError(
        "Old password is required to update password",
        BAD_REQUEST
      );
    }

    // Verify old password
    const isPasswordValid = await user.matchPassword(oldPassword);
    if (!isPasswordValid) {
      throw new HttpError("Old password is incorrect", UNAUTHORIZED);
    }

    // Hash and update the new password
    user.password = password;
  }

  // Save the updated user
  const updatedUser = await user.save();

  // Return the updated user data (excluding sensitive fields like password)
  return {
    _id: updatedUser._id,
    firstname: updatedUser.firstname,
    lastname: updatedUser.lastname,
    email: updatedUser.email,
    location: updatedUser.location,
    contact: updatedUser.contact,
    role: updatedUser.role,
  };
};

export const applyForJob = async (jobId, userId) => {
  // Check if the user has already applied for the job
  const alreadyApplied = await Jobs.findOne({
    _id: jobId,
    applications: userId,
  });

  if (alreadyApplied) {
    throw new HttpError("You have already applied for this job", CONFLICT);
  }

  // Add the user to the job's applications
  const job = await Jobs.findByIdAndUpdate(
    jobId,
    { $push: { applications: userId } },
    { new: true }
  );

  if (!job) {
    throw new HttpError("Job not found", NOT_FOUND);
  }

  return {
    success: true,
    message: "Application submitted successfully",
  };
};


export const getUserApplications = async (userId) => {
  // Find jobs the user has applied for
  const jobs = await Jobs.find({ applications: userId }).populate(
    "applications",
    "firstname lastname email"
  );

  // Check if jobs were found
  if (!jobs || jobs.length === 0) {
    throw new HttpError("No applications found", NOT_FOUND);
  }

  // Return the result
  return {
    success: true,
    message: "Jobs user has applied for",
    data: jobs,
  };
};