require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token)

  if (!token) {
    return res.json({
      message: "Tidak ada token ditemukan.",
      isValid: false,
    });
  }

  try {
    const tokenDecode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.id = tokenDecode.id;
    next();
  } catch (error) {
    return res.json({
      message: "Token salah.",
      isValid: false,
    });
  }
};
