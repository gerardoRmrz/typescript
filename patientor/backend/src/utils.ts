import { z } from "zod";
import type { NewPatientEntry, EntryWithoutId } from "./newTypes.ts";
import { HealthCheckRating } from "./newTypes.ts";
import { Gender as GenderObj } from "./newTypes.ts";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(GenderObj),
  occupation: z.string(),
  ssn: z.string(),
});

export const parseNewPatient = (object: unknown): NewPatientEntry => {
  return NewPatientSchema.parse(object);
};

const BaseEntrySchema = z.object({
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  description: z.string(),
});

const SickLeave = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const Discharge = z.object({
  date: z.string(),
  criteria: z.string(),
});

const HealthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk),
]);

const OccupationalHealthCareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  SickLeave: SickLeave,
});

const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: Discharge,
});

const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

const EntrySchema = z.union([
  OccupationalHealthCareSchema,
  HospitalSchema,
  HealthCheckSchema,
]);

export const parseNewEntry = (object: unknown): EntryWithoutId => {
  return EntrySchema.parse(object);
};
