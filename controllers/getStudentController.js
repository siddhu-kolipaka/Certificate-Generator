import studentUsers from "../models/studentUsers.js";

const getStudent = async (req, res) => {
  const { idno } = req.params;
  if (!idno) return res.status(400).json({ message: "idno required" });
  try {
    const user = await studentUsers.findOne({ idno });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No student exists with that idno" });
    }
    return res.status(200).json({ ...user._doc, password: undefined });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: `Error getting student` });
  }
};

export default getStudent;
