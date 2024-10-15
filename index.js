import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/auth/root.js";
import rootRouter from "./routes/root.js";
import connectDatabase from "./services/connectDatabase.js";
import hbs from "hbs";
import timeout from "connect-timeout";

// env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(timeout("30s"));

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// for serving files, using template engine: hbs (handlebars)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// routes
app.use("/", rootRouter);
app.use("/auth", apiRouter);

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
