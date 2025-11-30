import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
const URl = process.env.MONGO_URI;

try {
  mongoose.connect(URl);
  console.log(" Database connected ");
} catch (error) {
  console.log(error);
}

app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(` Server running on localhost ${PORT} `);
});
