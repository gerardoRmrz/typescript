import { TextField } from "@mui/material";

interface BaseEntry {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  diagnosisCodes: string;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const BaseEntryForm = ({
  date,
  setDate,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setDiagnosisCodes,
  description,
  setDescription,
}: BaseEntry) => {
  return (
    <>
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
    </>
  );
};
export default BaseEntryForm;
