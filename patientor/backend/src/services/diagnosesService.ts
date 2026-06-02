import diagnoses from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getData = (): Diagnosis[] => {
  return diagnoses;
};

export default { getData };
