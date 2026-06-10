import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender, Diagnoses } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import Entries from "../Entries.tsx";

type RouteParams = {
  id: string;
};

interface Props {
  diagnoses: Diagnoses[];
}

const PatientInfo = ({ diagnoses }: Props) => {
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

  useEffect(() => {
    const fetchPatientById = async () => {
      const patientById = await patientService.getById(id);
      setUserInfo(patientById[0]);
    };
    void fetchPatientById();
  }, [id]);

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
    </>
  );
};

export default PatientInfo;
