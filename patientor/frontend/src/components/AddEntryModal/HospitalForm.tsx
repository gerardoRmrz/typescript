import {
  TextField,
  InputLabel,
  //SelectChangeEvent,
} from "@mui/material";

interface HospitalEntry {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalForm = ({
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
}: HospitalEntry) => {
  return (
    <>
      <InputLabel sx={{ marginTop: 2.5 }}>Discharge</InputLabel>
      <TextField
        type="date"
        label="dischargeDate"
        fullWidth
        value={dischargeDate}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={({ target }) => setDischargeDate(target.value)}
        sx={{ marginTop: 1 }}
      />
      <TextField
        label="dischargeCriteria"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );
};
export default HospitalForm;
