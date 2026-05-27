import express from "express";
import { bmiApp } from "./bmiCalculator.ts";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight as string;
  const height = req.query.height as string;

  try {
    const result = bmiApp(height, weight);
    if (typeof result === "string") {
      res.status(200).send(result);
    } else {
      res.status(400).send({ error: `malformed parameters: ${result}` });
    }
  } catch (error) {
    res.status(400).send({ error: `malformed parameters: ${error}` });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
