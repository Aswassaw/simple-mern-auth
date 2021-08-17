const { check, validationResult } = require("express-validator");

const runValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      message: errors.array()[0].msg,
    });
  }

  next();
};

const registerValidation = [
  check("username", "Username tidak boleh kosong.").notEmpty(),
  check("email", "Email tidak boleh kosong.")
    .notEmpty()
    .isEmail()
    .withMessage("Format email salah."),
  check("password", "Password tidak boleh kosong.")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter."),
];

const loginValidation = [
  check("username", "Username tidak boleh kosong").notEmpty(),
  check("password", "Password tidak boleh kosong").notEmpty(),
];

const forgotpasswordValidation = [
  check("email", "Email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("Format email salah"),
];

const resetpasswordValidation = [
  check("password", "Password tidak boleh kosong.")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter."),
]

module.exports = { runValidation, registerValidation, loginValidation, forgotpasswordValidation, resetpasswordValidation };
