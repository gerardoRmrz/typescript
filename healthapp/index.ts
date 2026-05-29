interface ExerciseData {
  daily_exercises: number[];
  target: number;
}

import express, { Request, Response } from "express";
import { bmiApp } from "./bmiCalculator.ts";
import { exercisesApp } from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.status(200).send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = req.query.weight as string;
  const height = req.query.height as string;
  try {
    const result = bmiApp(height, weight);
    if (result instanceof Error) {
      throw new Error();
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post(
  "/exercises",
  (req: Request<unknown, unknown, ExerciseData>, res: Response) => {
    const dailyHours = req.body.daily_exercises;
    const targetHours = req.body.target;
    try {
      const result = exercisesApp(dailyHours, targetHours);
      if (result instanceof Error) {
        console.log("+++++", result.message);
        throw new Error(result.message);
      }
      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      }
    }
  },
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
