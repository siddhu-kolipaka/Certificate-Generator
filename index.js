import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/auth/root.js";
import verifyRole from "./middlewares/verifyRole.js";
import connectDatabase from "./services/connectDatabase.js";

// env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/auth", apiRouter);

// jwt verifying middleware
app.use(verifyRole);

// jwt protected routes
app.get("/hahaha", (req, res) => {
  res.status(200).json({ message: "Went through verifyRole" });
});

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
