import { useState } from "react";
import { type DiaryEntry } from "../types";
const NewEntryForm = ({
  entries,
  setEntries,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}): React.JSX.Element => {
  const defaultNewEntry = {
    id: 0,
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  };

  const [newEntry, setNewEntry] = useState<DiaryEntry>(defaultNewEntry);

  const submitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ ...newEntry, id: entries.length + 1 });
    setEntries(entries.concat({ ...newEntry, id: entries.length + 1 }));
    setNewEntry(defaultNewEntry);
  };

  return (
    <>
      <section>
        <form onSubmit={(e) => submitForm(e)} id="newEntry-form">
          <label htmlFor="date-input">
            Date:
            <input
              type="text"
              id="date-input"
              name="date-input"
              value={newEntry?.date}
              onChange={(e) =>
                setNewEntry({ ...newEntry, date: e.target.value })
              }
            ></input>
          </label>

          <label htmlFor="weather-input">
            weather:{" "}
            <input
              type="text"
              id="weather-input"
              name="weather-input"
              value={newEntry.weather}
              onChange={(e) =>
                setNewEntry({ ...newEntry, weather: e.target.value })
              }
            ></input>
          </label>
          <label htmlFor="visibility-input">
            visibility:{" "}
            <input
              type="text"
              id="visibility-input"
              name="visibility-input"
              value={newEntry.visibility}
              onChange={(e) =>
                setNewEntry({ ...newEntry, visibility: e.target.value })
              }
            ></input>
          </label>
          <label htmlFor="comment-input">
            comment:{" "}
            <input
              type="text"
              id="comment-input"
              name="comment-input"
              value={newEntry.comment}
              onChange={(e) =>
                setNewEntry({ ...newEntry, comment: e.target.value })
              }
            ></input>
          </label>
          <button type="submit">submit</button>
        </form>
      </section>
    </>
  );
};

export default NewEntryForm;
