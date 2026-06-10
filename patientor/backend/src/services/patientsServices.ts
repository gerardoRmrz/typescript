import type {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../newTypes.ts";
import patients from "../../data/newPatientsData.ts";
import { v1 as uuid } from "uuid";

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
    entries: [],
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatient: Patient = { ...entry, id, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

export default { getData, getNonsensitiveData, addPatient };
