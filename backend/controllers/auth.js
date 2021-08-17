require("dotenv").config();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { sendEmail } = require("../helpers");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  let userDataEmail = await User.findOne({ email: email });
  let userDataUsername = await User.findOne({ username: username });

  // Jika email sudah terdaftar
  if (userDataEmail) {
    return res.status(404).json({
      message: "Email telah terdaftar.",
    });
  }

  // Jika username sudah terdaftar
  if (userDataUsername) {
    return res.status(404).json({
      message: "Username telah terdaftar.",
    });
  }

  const passwordHash = await bcryptjs.hash(password, 10);
  const user = new User({
    username,
    email,
    password: passwordHash,
  });

  user.save();

  return res.status(201).json({
    message: "User berhasil ditambahkan, silahkan Login.",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const userData = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  // Jika user ditemukan
  if (userData) {
    const passwordCheck = await bcryptjs.compare(password, userData.password);

    // Jika password benar
    if (passwordCheck) {
      const data = {
        id: userData._id,
      };
      const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET);

      return res.status(200).json({
        message: "Berhasil Login",
        token,
      });
    }

    return res.status(404).json({
      message: "Gagal Login",
      error: "Password salah",
    });
  }

  return res.status(404).json({
    message: "Gagal Login",
    error: "User tidak ditemukan.",
  });
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.id });

  return res.status(200).json({
    message: "Berhasil masuk.",
    user,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ email: email });

  if (!userData) {
    return res.status(404).json({
      message: "Email tidak dapat ditemukan.",
    });
  }

  const token = jsonwebtoken.sign(
    {
      id: userData._id,
    },
    process.env.JWT_SECRET
  );
  await User.updateOne({ resetPasswordLink: token });

  const templateEmail = {
    from: "Mern Auth",
    to: req.body.email,
    subject: "Link Reset Password",
    html: `<p>Silahkan klik link berikut untuk reset password anda: <a href="${process.env.CLIENT_URL}/resetpassword/${token}" _target="blank">Reset Password</a></p>`,
  };

  sendEmail(templateEmail);

  return res.status(200).json({
    message: "Link reset password berhasil dikirim.",
  });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const userData = await User.findOne({ resetPasswordLink: token });

  if (!userData) {
    return res.status(404).json({
      message: "Token salah atau kedaluwarsa.",
    });
  }

  const passwordHashed = await bcryptjs.hash(password, 10);
  userData.password = passwordHashed;
  await userData.save();

  return res.status(200).json({
    message: "Password berhasil diubah.",
  });
};

module.exports = { register, login, getUser, forgotPassword, resetPassword };
