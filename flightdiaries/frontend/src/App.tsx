import { useState, useEffect } from "react";
import { type DiaryEntry } from "./types.ts";
import axios from "axios";

import WeatherCards from "./components/WeatherCards.tsx";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    axios.get<DiaryEntry[]>("http://localhost:3000/api/diaries").then((res) => {
      setEntries(res.data);
    });
  }, []);
  return (
    <>
      <header>
        <h1>Flight Diaries App</h1>
      </header>
      <WeatherCards entries={entries} />
    </>
  );
}

export default App;
