import { Diagnoses, Entry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; //hospital
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation"; //occupational
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"; // healthcheck
import FavoriteIcon from "@mui/icons-material/Favorite"; // estado de salud

type Props = {
  entriesList: Entry[];
  diagnoses: Diagnoses[];
};

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const Entries = ({ entriesList, diagnoses }: Props) => {
  const filterDiagnosesByCode = (code: string) => {
    const [diagnoseDescription] = diagnoses.filter(
      (diagnose) => diagnose.code === code,
    );
    if (!diagnoseDescription) {
      return;
    }
    return diagnoseDescription?.name;
  };

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
  };

  const typeEntryIcon = (entryType: EntryType) => {
    switch (entryType) {
      case "Hospital":
        return <LocalHospitalIcon />;
      case "OccupationalHealthcare":
        return <MedicalInformationIcon />;
      case "HealthCheck":
        return <MonitorHeartIcon />;
      default:
        return assertNever(entryType);
    }
  };

  const employerName = (entry: Entry) => {
    if (entry.type === "OccupationalHealthcare") {
      return entry.employerName;
    } else {
      return null;
    }
  };

  const healthIcon = (entry: Entry) => {
    if (entry.type === "HealthCheck") {
      const healthCode = entry.healthCheckRating;
      switch (healthCode) {
        case 0:
          return <FavoriteIcon sx={{ color: "green" }} />;
        case 1:
          return <FavoriteIcon sx={{ color: "blue" }} />;
        case 2:
          return <FavoriteIcon sx={{ color: "yellow" }} />;
        case 3:
          return <FavoriteIcon sx={{ color: "red" }} />;
        default:
          return assertNever(healthCode);
      }
    } else {
      return null;
    }
  };

  const entryStyle: React.CSSProperties = {
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: "10px",
    margin: "10px 0 0 0",
    padding: "0 5px 0 5px",
  };

  return (
    <div>
      {entriesList.map((entry: Entry) => (
        <div key={entry.id} style={entryStyle}>
          <p>
            <span>
              <strong>{entry.date}</strong>
            </span>{" "}
            <span>
              {typeEntryIcon(entry.type)} {employerName(entry)}
            </span>
          </p>
          <p>{entry.description}</p>
          {healthIcon(entry)}
          {entry.diagnosisCodes ? (
            <ul>
              {entry.diagnosisCodes.map((code, index) => (
                <li key={index}>
                  {" "}
                  <strong>{code}</strong> {filterDiagnosesByCode(code)}
                </li>
              ))}
            </ul>
          ) : null}
          <p>diagnose by {entry.specialist}</p>
          {entry.type === "Hospital" ? (
            <p>
              {entry.discharge.date} {entry.discharge.criteria}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Entries;
