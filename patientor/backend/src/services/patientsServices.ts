import type { Patient, NonSensitivePatientEntry } from "../types.ts";
import patients from "../../data/patients.ts";

const getData = (): Patient[] => {
  return patients;
};

const getNonsensitiveData = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getData, getNonsensitiveData };
