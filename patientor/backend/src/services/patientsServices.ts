import type {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryWithoutId,
} from "../newTypes.ts";
import patients from "../../data/newPatientsData.ts";
import { v1 as uuid } from "uuid";

const getData = (): Patient[] => {
  return patients;
};

const getPatientByID = (patientId: string): Patient | undefined => {
  const patientsInfo = getData();
  const [result] = patientsInfo.filter((patient) => patient.id === patientId);
  return result;
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

const addPatient = (newRegistry: NewPatientEntry): Patient => {
  console.log("============: ", newRegistry);
  const id = uuid();
  const newPatient: Patient = { ...newRegistry, id, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const updatePatientById = (
  patientId: string,
  updatedPatientData: Patient,
): Patient[] => {
  const patientsList = getData();
  const updatedPatientsList = patientsList.map((patient) =>
    patient.id === patientId ? updatedPatientData : patient,
  );
  return updatedPatientsList;
};

const addEntryToPatientId = (
  patientId: string,
  newEntry: EntryWithoutId,
): Patient[] => {
  const currentPatient = getPatientByID(patientId);
  const entries = currentPatient?.entries;
  if (entries) {
    const updatedEntries = entries.concat({ ...newEntry, id: uuid() });
    const updatedPatient = {
      ...currentPatient,
      entries: updatedEntries,
    };
    return updatePatientById(patientId, updatedPatient);
  }
  throw new Error(`Could not find patient with id ${patientId}`);
};

export default {
  getData,
  getNonsensitiveData,
  addPatient,
  addEntryToPatientId,
};
