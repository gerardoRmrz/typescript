import axios from "axios";
import { EntryWithoutId, type Patient, type PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object,
    config,
  );

  return data;
};

const addPatientEntry = async (object: EntryWithoutId, id: string) => {
  console.log(object);
  const { data } = await axios.post<Patient[]>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
    config,
  );
  return data;
};

export default {
  getAll,
  create,
  getById,
  addPatientEntry,
};
