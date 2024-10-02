import jwt from 'jsonwebtoken';

export const Verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the authorization header

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access denied, no token provided.",
    });
  }

  const token = authHeader.split(" ")[1]; // Split the "Bearer <token>" and get the token
  console.log("Token received on backend:", token); // Log the full token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied, no token provided.",
    });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Log the error
      return res.status(403).json({
        success: false,
        message: "Invalid token.",
      });
    }

    req.user = user; // Attach the decoded user information to the request
    console.log("User verified from token:", user); // Log the verified user info
    next(); // Proceed to the next middleware
  });
};
