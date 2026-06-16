import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { followRouter } from "./routes/followRoutes.js";
import cors from "cors";

const app = express();
app.use(cookieParser());

dotenv.config();
connectDB(process.env.MONGODB_URL);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá!");
});

// app.get("/users", (req, res) => {
//   res.send("Rota de usy!");
// });

//auth
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/follows", followRouter);

app.listen(8080, () => {
  console.log("Hello Express!");
});
