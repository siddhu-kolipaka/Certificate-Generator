import bcrypt from "bcrypt";
import dotenv from "dotenv";
import teacherUsers from "../models/teacherUsers.js";
import studentUsers from "../models/studentUsers.js";
dotenv.config();

const handleTeacherLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Both email and password are needed to login" });

  const user = await teacherUsers.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: `No user with ${email} found` });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    console.log("Logged in");
    res.cookie("role", "teacher", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).redirect("/certificate-generator");
  } else {
    res.status(400).json({ message: "Wrong email/password" });
  }
};

const handleStudentLogin = async (req, res) => {
  const { idno, password } = req.body;
  if (!idno || !password)
    return res
      .status(400)
      .json({ message: "Both idno and password are needed to login" });

  const user = await studentUsers.findOne({ idno });
  if (!user) {
    return res.status(400).json({ message: `No user with ${idno} found` });
  }
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    res.cookie("secret", `${user.password}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.sendStatus(200);
  } else {
    res.status(400).json({ message: "Wrong idno/password" });
  }
};

export { handleTeacherLogin, handleStudentLogin };
