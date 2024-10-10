import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import studentUsers from "../models/studentUsers.js";
import teacherUsers from "../models/teacherUsers.js";

const handleTeacherSignup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.json({
      message: "Name, Password and Email are all needed to signup",
    });
  }

  const duplicate_email = await teacherUsers.findOne({ email });
  if (duplicate_email)
    return res.status(409).json({ message: "email already used" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await registeredUsers.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return res.status(201).json({ message: `${name} is added` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleStudentSignup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.json({
      message: "Name, Password and Email are all needed to signup",
    });
  }

  const duplicate_email = await teacherUsers.findOne({ email });
  if (duplicate_email)
    return res.status(409).json({ message: "email already used" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await registeredUsers.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    return res.status(201).json({ message: `${name} is added` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { handleTeacherSignup, handleStudentSignup };
