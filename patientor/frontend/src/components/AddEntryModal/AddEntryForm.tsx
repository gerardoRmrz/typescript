import { useState, SyntheticEvent } from "react";

/* import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  //SelectChangeEvent,
} from "@mui/material"; */

import HospitalForm from "./HospitalForm";

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
  const [description, setDescription] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    console.log(diagnosisCodes.length, "<****************");
    event.preventDefault();
    onSubmit({
      date,
      specialist,
      diagnosisCodes:
        diagnosisCodes.length > 0 ? diagnosisCodes.split(", ") : [],
      description,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
  };

  return (
    <>
      <HospitalForm
        addEntry={addEntry}
        date={date}
        setDate={setDate}
        specialist={specialist}
        setSpecialist={setSpecialist}
        diagnosisCodes={diagnosisCodes}
        setDiagnosisCodes={setDiagnosisCodes}
        description={description}
        setDescription={setDescription}
        dischargeDate={dischargeDate}
        setDischargeDate={setDischargeDate}
        dischargeCriteria={dischargeCriteria}
        setDischargeCriteria={setDischargeCriteria}
        onCancel={onCancel}
      />
    </>
  );
};

export default AddEntryForm;
