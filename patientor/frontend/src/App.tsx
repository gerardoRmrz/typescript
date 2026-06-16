import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import type { Patient, Diagnoses } from "./types";

import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo/PatientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);
  const [showEntryButton, setShowEntryButton] = useState(false);

  //=================================================

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  //=================================================

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patientsList = await patientService.getAll();
      setPatients(patientsList);
    };

    const fetchDiagnosesData = async () => {
      const diagnosesAll = await diagnosesService.getAll();
      setDiagnoses(diagnosesAll);
    };

    void fetchPatientList();
    void fetchDiagnosesData();
  }, []);
  console.log(patients, "<***********");
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            onClick={() => setShowEntryButton(false)}
          >
            Home
          </Button>{" "}
          {showEntryButton ? (
            <Button color="primary" variant="contained" onClick={openModal}>
              Add Entry
            </Button>
          ) : null}
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={
                <PatientInfo
                  diagnoses={diagnoses}
                  patients={patients}
                  setPatients={setPatients}
                  setShowEntryButton={setShowEntryButton}
                  modalOpen={modalOpen}
                  error={error}
                  closeModal={closeModal}
                  setModalOpen={setModalOpen}
                />
              }
            ></Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
