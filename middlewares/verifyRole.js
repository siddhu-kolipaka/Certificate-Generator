const verifyTeacherRole = (req, res, next) => {
  const { role } = req.cookies;
  if (role === "teacher") {
    next();
  } else {
    res.redirect("/teacherLogin");
  }
};

const verifyStudentRole = (req, res, next) => {
  const { secret } = req.cookies;
  if (secret) {
    next();
  } else {
    res.redirect("/studentLogin");
  }
};

export { verifyTeacherRole, verifyStudentRole };
