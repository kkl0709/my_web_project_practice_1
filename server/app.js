import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
const { MONGO_URI } = config;

console.log("app파일 실행");
console.log("Mongo", MONGO_URI);
console.log("config", config);

app.use(hpp());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(express.json());


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
});
export default app;
