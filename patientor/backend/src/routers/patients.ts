/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { Router, type Response } from "express";
import patientsServices from "../services/patientsServices.ts";
import { parseNewPatientEntry } from "../utils.ts";

import type { NonSensitivePatientEntry } from "../types.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonsensitiveData());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
