const { validationResult } = require("express-validator");
const userService = require("../services/user.services");
const UserRole = require("../models/user.role.model");
const AuditService = require("../services/audit.service");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { userName, email, password } = req.body;
  const user = await userService.createUser({ userName, email, password });
  // console.log(user,'..................')
  const token = user.generateToken();
  res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.UserRole ? user.UserRole.get("role_id") : null,
    },
  });
  await AuditService.logAction(req, "REGISTER", "USER", user.id, null, { username: user.username, email: user.email });
};
module.exports.login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser({ email, password });
    const token = user.generateToken();
    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        school_id: user.school_id,
        role: user.UserRole ? user.UserRole.get("role_id") : null,
        user_id: user.UserRole ? user.UserRole.get("user_id") : null,
      },
    });
    await AuditService.logAction(req, "LOGIN", "USER", user.id);
  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(error.message === 'Check Email OR Password' ? 401 : 500).json({ message: error.message || "Authentication failed" });
  }
};
module.exports.profile = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const user = req.body;

  const selectUser = await userService.getUserProfile(user);
  if (!selectUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    message: "User profile fetched successfully",
    user: selectUser,
  });
};
module.exports.school = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const school = req.body;
  //console.log(school,'school',req.files)
  try {
    const createdSchool = await userService.createSchool(school, req.files);
    res.status(201).json({
      message: "School created successfully",
      school: createdSchool,
    });
  } catch (error) {
    console.error("Error creating school:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
