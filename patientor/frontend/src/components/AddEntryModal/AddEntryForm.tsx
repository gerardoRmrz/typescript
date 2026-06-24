import { useState, SyntheticEvent } from "react";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Grid,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";
/* import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  //SelectChangeEvent,
} from "@mui/material"; */

import BaseEntryForm from "./BaseForm";

import HospitalForm from "./HospitalForm";

import HealthCheckForm from "./HealthCheckForm";

import OccupationalHCForm from "./OccupationalHCForm";

import { EntryWithoutId, Diagnoses } from "../../types";

interface Props {
  diagnosisCodesList: Diagnoses[];
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ diagnosisCodesList, onCancel, onSubmit }: Props) => {
  const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
  } as const;

  type HealthCheckRating =
    (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

  const [entryType, setEntryType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [healthCode, setHealthCode] = useState<number>(0);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    console.log(entryType, "<****************");
    event.preventDefault();
    switch (entryType) {
      case "Hospital":
        onSubmit({
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          description,
          type: entryType,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        return;
      case "OccupationalHealthcare":
        onSubmit({
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          description,
          type: entryType,
          employerName: employerName,
          SickLeave: {
            startDate: startDate,
            endDate: endDate,
          },
        });
        return;
      case "HealthCheck":
        onSubmit({
          date,
          specialist,
          diagnosisCodes: diagnosisCodes,
          description,
          type: entryType,
          healthCheckRating: healthCode as HealthCheckRating,
        });
        return;
      default:
        throw new Error("something wrong happens");
    }
  };

  const handleEntryType = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    console.log("***=>", event.target.value);
    setEntryType(event.target.value);
  };

  const renderForm = () => {
    switch (entryType) {
      case "Hospital":
        return (
          <HospitalForm
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
          />
        );
      case "HealthCheck":
        return (
          <HealthCheckForm
            healthCheckRating={healthCode}
            setHealthCheckRating={setHealthCode}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHCForm
            employerName={employerName}
            setEmployerName={setEmployerName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <InputLabel shrink id="entry-type">
        Entry Type
      </InputLabel>
      <Select
        labelId="entry-type"
        id="entry-select"
        notched={true}
        fullWidth
        value={entryType}
        onChange={handleEntryType}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography color="textSecondary">Select an option...</Typography>
            );
          }
          return selected;
        }}
        sx={{ marginBottom: 1 }}
      >
        <MenuItem key="hospital" value="Hospital">
          Hospital
        </MenuItem>
        <MenuItem key="healthCheck" value="HealthCheck">
          Health Check
        </MenuItem>
        <MenuItem key="occupationalHealthcare" value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>
      <form onSubmit={addEntry}>
        <BaseEntryForm
          entryType={entryType}
          date={date}
          setDate={setDate}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodesList={diagnosisCodesList}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
          description={description}
          setDescription={setDescription}
        />
        {renderForm()}
        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          {entryType ? (
            <Grid size="auto">
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </form>
    </>
  );
};

export default AddEntryForm;
