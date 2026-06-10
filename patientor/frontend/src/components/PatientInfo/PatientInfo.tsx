import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { type Patient, type Gender } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

type RouteParams = {
  id: string;
};

const PatientInfo = () => {
  const initPatient: Patient = {
    id: "",
    name: "",
    occupation: "",
    ssn: "",
    gender: "other" as Gender,
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
    </>
  );
};

export default PatientInfo;
