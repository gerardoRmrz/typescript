import express from "express";
import cors from "cors";
import data from "./data/diagnoses.ts";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
