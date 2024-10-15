import dotenv from "dotenv";
dotenv.config();

const clearCookies = async (req, res, next) => {
  const { role, secret } = req.cookies;
  if (secret) {
    res.clearCookie("secret", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
  }
  if (role) {
    res.clearCookie("role", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
  }
  next();
};

export default clearCookies;
