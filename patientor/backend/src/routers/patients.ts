import { Router, type Response } from "express";
import patientsServices from "../services/patientsServices.ts";
import type { NonSensitivePatientEntry } from "../types.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonsensitiveData());
});

export default router;
