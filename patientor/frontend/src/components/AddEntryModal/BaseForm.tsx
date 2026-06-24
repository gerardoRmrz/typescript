import {
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Diagnoses } from "../../types";
interface BaseEntry {
  entryType: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodesList: Diagnoses[];
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const BaseEntryForm = ({
  entryType,
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodesList,
  diagnosisCodes,
  setDiagnosisCodes,
  description,
  setDescription,
}: BaseEntry) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <TextField
        type="date"
        label="Date"
        fullWidth
        value={date}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <Select
        multiple
        fullWidth
        value={diagnosisCodes}
        onChange={handleChange}
        displayEmpty
        disabled={entryType === "HealthCheck"}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography color="textSecondary">Select an option...</Typography>
            );
          }
          return selected.join(",");
        }}
      >
        {diagnosisCodesList.map((diag, index) => (
          <MenuItem key={index} value={diag.code}>
            {diag.code} {diag.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
    </>
  );
};
export default BaseEntryForm;
