import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { router } from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

dotenv.config();
connectDB(process.env.MONGODB_URL);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", router);

app.get("/", (req, res) => {
  res.send("Olá!");
});

app.get("/users", (req, res) => {
  res.send("Rota de usy!");
});

app.listen(8080, () => {
  console.log("Hello Express!");
});
