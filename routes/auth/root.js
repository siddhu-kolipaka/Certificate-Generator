import express from "express";
const router = express.Router();

import { handleTeacherSignup } from "../../controllers/signupController.js";

router.route("/signup").post(handleTeacherSignup);

export default router;
