import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm from "./AddEntryForm";
import { EntryWithoutId, Diagnoses } from "../../types";

interface Props {
  diagnosisCodes: Diagnoses[];
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({
  diagnosisCodes,
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog
    fullWidth={true}
    open={modalOpen}
    onClose={() => onClose()}
    disableRestoreFocus={false}
  >
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        diagnosisCodesList={diagnosisCodes}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
