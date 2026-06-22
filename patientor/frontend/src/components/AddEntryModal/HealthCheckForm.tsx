import {
  TextField,
  InputLabel,
  //SelectChangeEvent,
} from "@mui/material";

interface HealthCheckEntry {
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}

const HealthCheckForm = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckEntry) => {
  return (
    <>
      <InputLabel sx={{ marginTop: 2.5 }}> Health Rating </InputLabel>
      <TextField
        label="healthRate (0-3)"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      />
    </>
  );
};
export default HealthCheckForm;
