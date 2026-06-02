/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router, type Response } from "express";
import patientsServices from "../services/patientsServices.ts";
import parseNewPatientEntry from "../utils.ts";

import type { NonSensitivePatientEntry } from "../types.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonsensitiveData());
});

router.post("/", (req, res) => {
  const newPatientEntry = parseNewPatientEntry(req.body);
  const addedEntry = patientsServices.addPatient(newPatientEntry);
  res.json(addedEntry);
});

export default router;
