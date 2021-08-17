const express = require("express");
const {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const {
  runValidation,
  registerValidation,
  loginValidation,
  forgotpasswordValidation,
  resetpasswordValidation,
} = require("../validation");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    name: "Selamat datang di Backend Mern-Auth",
  });
});

router.get("/verifyToken", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "JWT Token Valid",
    isValid: true,
  })
})

router.post("/login", loginValidation, runValidation, login);
router.post("/register", registerValidation, runValidation, register);
router.put("/forgotpassword", forgotpasswordValidation, runValidation, forgotPassword);
router.put('/resetpassword', resetpasswordValidation, runValidation, resetPassword)
router.get("/user", authMiddleware, getUser);

module.exports = router;
