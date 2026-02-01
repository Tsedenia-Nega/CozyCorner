import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import { ZodError } from "zod";
//check if user is login
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userRepository.findById(decoded.id);
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// check if user is an Admin
export const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Access denied, Admins only" });
  }
};


export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Use .issues (the standard) and add || [] just in case it's empty
      const issues = error.issues || [];

      const errorMessages = issues.map((err) => ({
        field: err.path[0], // e.g., "password"
        message: err.message, // e.g., "Password must contain..."
      }));

      return res.status(400).json({
        status: "fail",
        errors: errorMessages,
      });
    }

    // If it's not a Zod error, let the global handler catch it
    next(error);
  }
};