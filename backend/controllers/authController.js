import asyncHandler from "express-async-handler";
import { applyForJob, loginUser, registerUser, updateProfile } from "../service/authService.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/UserModel.js";
import { CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http.codes.js";
import { clearAuthCookies } from "../utils/authCookies.js";
import { HttpError } from "../utils/HttpError.js";



export const registHandler = asyncHandler(
  async (req, res, next) => {
    const user = registerUser(req.body);

    await generateToken(res, user._id);

    const data =  User(user).omitField("password");

    res.status(CREATED).json({
      message: "User Succesfully registered",
      data: data
    });
  }
);

export const loginHandler = asyncHandler(async (req, res, next) => {
  const user = await loginUser(req.body);

  await generateToken(res, user._id);

    const data = new User(user).omitField("password");

    res.status(OK).json({
      message: "Successfully logged in",
      data: data
    });

});

export const logoutHandler = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(OK).json({ success: true, message: "Sad to see you go" });
});

export const updateProfileHandler = asyncHandler(async (req, res, next) => {
  // Extract the user ID from the authenticated request
  const userId = req.user._id;

  // Add the user ID to the update data
  const updateData = {
    userId,
    ...req.body, // Include all other fields from the request body
  };

  // Call the updateProfile service method
  const updatedUser = await updateProfile(updateData);

  // Optionally regenerate the token (if needed)
  await generateToken(res, updatedUser._id);

  // Omit sensitive fields like password from the response
  const data = new User(updatedUser).omitField("password");

  // Send the response
  res.status(OK).json({
    message: "Profile updated successfully",
    data: data,
  });
});
