import { Router, type Response } from "express";
import diagnosesService from "../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

const router: Router = Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getData());
});

export default router;
