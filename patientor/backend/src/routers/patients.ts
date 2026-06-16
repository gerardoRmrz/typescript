import { z } from "zod";

import { Router, type Response } from "express";
import patientsServices from "../services/patientsServices.ts";
import { parseNewPatient, parseNewEntry } from "../utils.ts";

import type { Patient } from "../newTypes.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  res.send(patientsServices.getData());
});

router.get("/:id", (req, res: Response<Patient[]>) => {
  const patientId = req.params.id;
  const patientsInfo = patientsServices.getData();
  const requestedPatient = patientsInfo.filter(
    (patient) => patient.id === patientId,
  );
  res.send(requestedPatient);
});

router.post("/", (req, res) => {
  try {
    const newPatient = parseNewPatient(req.body);
    const addedPatient = patientsServices.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: `unknown error: ${error}` });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = parseNewEntry(req.body);
    const addedEntry = patientsServices.addEntryToPatientId(
      req.params.id,
      newEntry,
    );

    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: `unknown error: ${error}` });
    }
  }
});

export default router;
