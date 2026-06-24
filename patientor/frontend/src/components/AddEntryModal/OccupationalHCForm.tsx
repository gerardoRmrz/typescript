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
      <InputLabel sx={{ margin: 1 }}>Sick Leave</InputLabel>
      <TextField
        label="start date"
        type="date"
        fullWidth
        value={startDate}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <TextField
        sx={{ marginTop: 1 }}
        label="end date"
        type="date"
        fullWidth
        value={endDate}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </>
  );
};
export default OccupationalHCForm;
