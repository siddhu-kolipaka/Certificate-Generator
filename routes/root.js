import express from "express";
import {
  verifyStudentRole,
  verifyTeacherRole,
} from "../middlewares/verifyRole.js";
import studentUsers from "../models/studentUsers.js";
const router = express.Router();

import clearCookies from "../middlewares/clearCookies.js";

router.route("/").get(clearCookies, async (req, res) => {
  res.render("home");
});

router.route("/studentSignup").get(async (req, res) => {
  res.render("studentSignup");
});
router.route("/studentLogin").get(clearCookies, async (req, res) => {
  res.render("studentLogin");
});
router.route("/teacherSignup").get(async (req, res) => {
  res.render("teacherSignup");
});
router.route("/teacherLogin").get(clearCookies, async (req, res) => {
  res.render("teacherLogin");
});

router
  .route("/certificate-generator")
  .get(verifyTeacherRole, async (req, res) => {
    res.render("certificate-generator");
  });

router.route("/students/:idno").post(verifyTeacherRole, async (req, res) => {
  const { idno } = req.params;

  const user = await studentUsers.findOne({ idno });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    idno: user.idno,
    name: user.name,
    topic: user.topic,
    mentor: user.mentor,
    stdate: user.stdate,
    endate: user.endate,
  });
});

router
  .route("/student-profile/:idno")
  .get(verifyStudentRole, async (req, res) => {
    const { idno } = req.params;
    const { secret } = req.cookies;

    const user = await studentUsers.findOne({ idno });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password != secret)
      res.status(400).json({ message: "Dont try to access other's data" });

    res.render("student-profile", {
      idno: user.idno,
      name: user.name,
      topic: user.topic,
      mentor: user.mentor,
      stdate: user.stdate,
      endate: user.endate,
    });
  });

export default router;
