import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    idno: {
      type: String,
      required: true,
      unique: true,
    },
    topic: {
      type: String,
      required: true,
    },
    mentor: {
      type: String,
      required: true,
    },
    stdate: {
      type: String,
      required: true,
    },
    endate: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studentUsers = mongoose.model("studentUsers", studentSchema);
export default studentUsers;
