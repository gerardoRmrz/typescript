import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnoses, EntryWithoutId } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import Entries from "../Entries.tsx";
import AddEntryModal from "../AddEntryModal";

type RouteParams = {
  id: string;
};

interface Props {
  diagnoses: Diagnoses[];
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  setShowEntryButton: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
  error: string | undefined;
  closeModal: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientInfo = ({
  diagnoses,
  patients,
  setPatients,
  setShowEntryButton,
  modalOpen,
  error,
  closeModal,
  setModalOpen,
}: Props) => {
  const initPatient: Patient = {
    id: "",
    name: "",
    occupation: "",
    ssn: "",
    gender: "other" as Gender,
    entries: [],
  };

  const [userInfo, setUserInfo] = useState<Patient>(initPatient);

  const { id } = useParams() as RouteParams;

  const submitNewEntry = async (values: EntryWithoutId) => {
    const updatedPatientList = await patientService.addPatientEntry(values, id);
    setPatients(updatedPatientList);
    try {
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log("**", error);
      }
    }
  };

  useEffect(() => {
    const fetchPatientById = () => {
      const [patientById] = patients.filter((patient) => patient.id === id);
      setUserInfo(patientById);
    };
    setShowEntryButton(true);
    void fetchPatientById();
  }, [id, setShowEntryButton, patients]);
  console.log(userInfo, "<++++++++++++++++++");
  return (
    <>
      <h2>
        {userInfo.name}{" "}
        {userInfo.gender === "female" ? <FemaleIcon /> : <MaleIcon />}{" "}
      </h2>
      <p>ssn: {userInfo.ssn}</p>
      <p>occupation: {userInfo.occupation}</p>
      <p>date of birth: {userInfo.dateOfBirth}</p>
      <h3>Entries</h3>
      {userInfo.entries ? (
        <Entries entriesList={userInfo.entries} diagnoses={diagnoses} />
      ) : (
        <p>no entries</p>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </>
  );
};

export default PatientInfo;
