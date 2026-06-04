import { useState, useEffect } from "react";
import { type DiaryEntry } from "./types.ts";
import axios from "axios";

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
      <section>
        {entries.map((entry) => (
          <div key={entry.id} className="weather-card">
            <h4>{entry.date}</h4>
            <div className="weather-visibility">
              <p>{entry.weather}</p>
              <p>{entry.visibility}</p>
            </div>
            <div className="comment">
              <p>{entry.comment}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
