import crypto from "crypto";

/**
 * Generates a long-lived refresh token.
 * @param {Object} user - The user object containing user details.
 */
const generateRefreshToken = async (user) => {
  const random = crypto.randomBytes(64);
  const refreshToken = random.toString("hex");

  // TODO: Store the refreshToken in a database associated with the user
  return refreshToken;
};

export default generateRefreshToken;
