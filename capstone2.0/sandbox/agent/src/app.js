import express from "express";
import morgan from "morgan";
import fs from "fs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const WORKING_DIR = "/workspace";

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from sandbox agent!",
    status: "success",
  });
});

app.get("/list-files", async (req, res) => {
  const elements = await fs.promises.readdir(WORKING_DIR);
  res.status(200).json({
    message: "Files listed successfully",
    elements,
  });
});

export default app;
