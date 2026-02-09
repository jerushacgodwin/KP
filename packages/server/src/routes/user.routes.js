const express = require("express");
const multer = require('multer');
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const permissionController = require("../controllers/permission.controller");
const authController = require("../controllers/auth.controller");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/school/"),
  filename: (req, file, cb) =>
    cb(null, file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage });
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("userName")
      .isLength({ min: 3 })
      .withMessage("User name must be min 3 char"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be grater than 6 char"),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be grater than 6 char"),
  ],
  userController.login
);
router.post(
  "/role",
  [
    body("role").notEmpty().withMessage("Invalid Role"),
    //
    //body('userId').isEmpty().withMessage('Invalid User ID')
  ],
  permissionController.Permission
);
router.post(
  "/profile",
  userController.profile
);
router.post(
  "/school",
  upload.fields([{ name: 'img' }]),
  userController.school
);
router.post(
  "/forgot-password",
  authController.forgotPassword
);

router.post(
  "/reset-password",
  authController.resetPassword
);

module.exports = router;
