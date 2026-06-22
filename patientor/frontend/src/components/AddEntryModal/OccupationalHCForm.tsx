import {
  TextField,
  InputLabel,
  //SelectChangeEvent,
} from "@mui/material";

interface OccupationalHCEntry {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHCForm = ({
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OccupationalHCEntry) => {
  return (
    <>
      <TextField
        label="employerName"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel sx={{ marginTop: 2.5 }}>Sick Leave</InputLabel>
      <TextField
        label="startDate"
        fullWidth
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <TextField
        label="endDate"
        fullWidth
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </>
  );
};
export default OccupationalHCForm;
