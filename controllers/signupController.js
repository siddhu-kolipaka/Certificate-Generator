import bcrypt from "bcrypt";

import studentUsers from "../models/studentUsers.js";
import teacherUsers from "../models/teacherUsers.js";

const handleTeacherSignup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.json({
      message: "All fields are needed to signup",
    });
  }

  const duplicate_email = await teacherUsers.findOne({ email });
  if (duplicate_email)
    return res.status(409).json({ message: "email already used" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await teacherUsers.create({
      email,
      name,
      password: hashedPassword,
    });
    return res.status(201).json({ message: `${name} is added` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleStudentSignup = async (req, res) => {
  const { name, idno, topic, mentor, stdate, endate, password } = req.body;
  if (!name || !idno || !topic || !mentor || !stdate || !endate || !password) {
    return res.json({
      message: "All fiels are needed to signup",
    });
  }

  const duplicate_idno = await studentUsers.findOne({ idno });
  if (duplicate_idno)
    return res.status(409).json({ message: "idno already used" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await studentUsers.create({
      name,
      idno,
      topic,
      mentor,
      stdate,
      endate,
      password: hashedPassword,
    });
    return res.status(201).json({ message: `${name} is added` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export { handleTeacherSignup, handleStudentSignup };
