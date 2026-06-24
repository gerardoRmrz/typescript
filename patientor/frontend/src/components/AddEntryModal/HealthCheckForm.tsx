import {
  Select,
  MenuItem,
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
      <Select
        label="healthRate (0-3)"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        <MenuItem value="0">0 -- Healthy</MenuItem>
        <MenuItem value="1">1 -- Low Risk</MenuItem>
        <MenuItem value="2">2 -- High Risk</MenuItem>
        <MenuItem value="3">3 -- Critical Risk</MenuItem>
      </Select>
    </>
  );
};
export default HealthCheckForm;
