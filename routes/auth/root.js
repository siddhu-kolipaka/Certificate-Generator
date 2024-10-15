import express from "express";
const router = express.Router();

import {
  handleStudentSignup,
  handleTeacherSignup,
} from "../../controllers/signupController.js";
import {
  handleStudentLogin,
  handleTeacherLogin,
} from "../../controllers/loginController.js";

router
  .route("/teacher-signup")
  .get((req, res) => {
    res.status(200).json({ message: "working" });
  })
  .post(handleTeacherSignup);
router.route("/student-signup").post(handleStudentSignup);
router.route("/teacher-login").post(handleTeacherLogin);
router.route("/student-login").post(handleStudentLogin);

export default router;
