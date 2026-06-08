export const Gender = {
  Female: "female",
  Male: "male",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

//eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
  entries?: Entry[];
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id" | "entries">;
