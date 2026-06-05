import { useState, useEffect } from "react";
import { type DiaryEntry } from "./types.ts";
import axios from "axios";

import WeatherCards from "./components/WeatherCards.tsx";
import NewEntryForm from "./components/NewEntryForm.tsx";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((res) => {
      setEntries(res.data);
    });
  }, []);

  const toggleVisibility = () => {
    setFormVisible((visibleStatus) => !visibleStatus);
  };
  console.log("errorMessage: ", errorMessage);
  return (
    <>
      <header>
        <h1>Flight Diaries App</h1>
      </header>
      <nav>
        <button type="button" onClick={toggleVisibility}>
          {!formVisible ? "add a new entry" : "Home"}
        </button>
      </nav>
      {errorVisible ? <div id="error-message">{errorMessage}</div> : null}
      {formVisible ? (
        <NewEntryForm
          entries={entries}
          setEntries={setEntries}
          setErrorMessage={setErrorMessage}
          setErrorVisible={setErrorVisible}
          toggleVisibility={toggleVisibility}
        />
      ) : (
        <WeatherCards entries={entries} />
      )}
    </>
  );
}

export default App;
