import { SyntheticEvent } from "react";
import {
  TextField,
  InputLabel,
  Grid,
  Button,
  //SelectChangeEvent,
} from "@mui/material";

interface HospitalEntry {
  addEntry: (event: SyntheticEvent) => void;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: string;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
  onCancel: () => void;
}

const HospitalForm = ({
  addEntry,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  description,
  setDescription,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
  onCancel,
}: HospitalEntry) => {
  return (
    <>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="diagnosisCodes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel sx={{ marginTop: 2.5 }}>Discharge</InputLabel>
        <TextField
          label="dischargeDate"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
          label="dischargeCriteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
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
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
export default HospitalForm;
