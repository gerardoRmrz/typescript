import { useState } from "react";
import { type DiaryEntry, type NewEntryFormType } from "../types";
import axios from "axios";
const NewEntryForm = ({
  entries,
  setEntries,
  setErrorMessage,
  setErrorVisible,
  toggleVisibility,
}: {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setErrorVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleVisibility: CallableFunction;
}): React.JSX.Element => {
  const defaultNewEntry = {
    id: 0,
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  };

  const [newEntry, setNewEntry] = useState<DiaryEntry>(defaultNewEntry);

  const inputElements: NewEntryFormType = [
    {
      labelName: "Date",
      type: "text",
      id: "date-input",
      name: "date-input",
      value: newEntry?.date,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewEntry({ ...newEntry, date: e.target.value }),
    },
    {
      labelName: "Weather",
      type: "text",
      id: "weather-input",
      name: "weather-input",
      value: newEntry?.weather,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewEntry({ ...newEntry, weather: e.target.value }),
    },
    {
      labelName: "Visibility",
      type: "text",
      id: "visibility-input",
      name: "visibility-input",
      value: newEntry?.visibility,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewEntry({ ...newEntry, visibility: e.target.value }),
    },
    {
      labelName: "Comment",
      type: "text",
      id: "comment-input",
      name: "comment-input",
      value: newEntry?.comment,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewEntry({ ...newEntry, comment: e.target.value }),
    },
  ];

  const submitForm = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/diaries", newEntry)
      .then((res) => {
        console.log("sending data: ");
        console.log(res.data);
        setEntries(entries.concat({ ...newEntry, id: entries.length + 1 }));
        setNewEntry(defaultNewEntry);
        toggleVisibility();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log("Error!!!", { error });
          setErrorVisible(true);
          setErrorMessage(
            "Error: " +
              error.response?.data.error[0].path[0] +
              ". " +
              error.response?.data.error[0].message,
          );
          setTimeout(() => {
            setErrorMessage("");
            setErrorVisible(false);
          }, 10000);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <section>
        <form onSubmit={(e) => submitForm(e)} id="newEntry-form">
          {inputElements.map((input, index) => (
            <label key={index} htmlFor={input.id}>
              <div>{input.labelName}:</div>
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                value={input.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  input.onChange(e)
                }
              ></input>
            </label>
          ))}
          <button type="submit" id="submit-button">
            submit
          </button>
        </form>
      </section>
    </>
  );
};

export default NewEntryForm;
