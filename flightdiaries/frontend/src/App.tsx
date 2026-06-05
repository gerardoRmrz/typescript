import { useState, useEffect } from "react";
import { type DiaryEntry } from "./types.ts";
import axios from "axios";

import WeatherCards from "./components/WeatherCards.tsx";
import NewEntryForm from "./components/NewEntryForm.tsx";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);
  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((res) => {
      setEntries(res.data);
    });
  }, []);

  const toggleVisibility = () => {
    setFormVisible(!formVisible);
  };
  return (
    <>
      <nav>
        <button type="button" onClick={toggleVisibility}>
          {!formVisible ? "add a new entry" : "Home"}
        </button>
      </nav>
      <header>
        <h1>Flight Diaries App</h1>
      </header>
      {!formVisible ? <WeatherCards entries={entries} /> : null}
      {formVisible ? (
        <NewEntryForm entries={entries} setEntries={setEntries} />
      ) : null}
    </>
  );
}

export default App;
