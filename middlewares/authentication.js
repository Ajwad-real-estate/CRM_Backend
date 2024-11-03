var jwt = require("jsonwebtoken");
var User = require("../models/User");

module.exports = async (req, res, next) => {
  let token;
  const err = new Error("User is not authenticated!");
  err.statusCode = 401;

  // Check for token in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(err);
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.jwt_secretkey_login);

    // Find the user by ID
    const person = await User.findById(decoded.userid);
    if (!person) {
      throw new Error("User not found");
    }

    // Check if user is active
    if (!person.isActive) {
      const error = new Error("User is not active");
      error.statusCode = 403;
      return next(error);
    }

    // Check if password has changed
    if (person.isChangedPassword(decoded.iat)) {
      throw new Error("Password has changed. Please log in again.");
    }

    // Attach user to the request object
    req.user = person;

    next();
  } catch (error) {
    // If the error is related to token verification, send 401
    if (error.name === 'JsonWebTokenError') {
      err.message = "Invalid token";
      return next(err);
    }
    
    // Handle other errors
    return next(error);
  }
};
