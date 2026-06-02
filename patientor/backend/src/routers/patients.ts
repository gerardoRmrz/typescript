/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Router, type Response } from "express";
import patientsServices from "../services/patientsServices.ts";
import type { NonSensitivePatientEntry } from "../types.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonsensitiveData());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const addedEntry = patientsServices.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });
  res.json(addedEntry);
});

export default router;
