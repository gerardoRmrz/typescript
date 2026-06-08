import { useState, type ReactNode } from "react";
import {
  type DiaryEntry,
  type Fieldset,
  type InputForm,
  type NewEntryFormType,
} from "../types";
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
      fieldset: "none",
      children: [
        {
          labelName: "Date",
          type: "date",
          id: "date-input",
          name: "date-input",
          value: newEntry?.date,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, date: e.target.value }),
        },
      ],
    },
    {
      fieldset: "weather",
      children: [
        {
          labelName: "sunny",
          type: "radio",
          id: "sunny-input",
          name: "sunny-input",
          value: "sunny",
          checked: newEntry?.weather === "sunny",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log("sunny: ", e.target.value);
            setNewEntry({ ...newEntry, weather: e.target.value });
          },
        },
        {
          labelName: "rainy",
          type: "radio",
          id: "rainy-input",
          name: "rainy-input",
          value: "rainy",
          checked: newEntry?.weather === "rainy",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, weather: e.target.value }),
        },
        {
          labelName: "cloudy",
          type: "radio",
          id: "cloudy-input",
          name: "cloudy-input",
          value: "cloudy",
          checked: newEntry?.weather === "cloudy",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, weather: e.target.value }),
        },
      ],
    },
    {
      fieldset: "visibility",
      children: [
        {
          labelName: "great",
          type: "radio",
          id: "great-input",
          name: "great-input",
          value: "great",
          checked: newEntry?.visibility === "great",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, visibility: e.target.value }),
        },
        {
          labelName: "good",
          type: "radio",
          id: "good-input",
          name: "good-input",
          value: "good",
          checked: newEntry?.visibility === "good",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, visibility: e.target.value }),
        },
        {
          labelName: "ok",
          type: "radio",
          id: "ok-input",
          name: "ok-input",
          value: "ok",
          checked: newEntry?.visibility === "ok",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, visibility: e.target.value }),
        },
        {
          labelName: "poor",
          type: "radio",
          id: "poor-input",
          name: "poor-input",
          value: "poor",
          checked: newEntry?.visibility === "poor",
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntry({ ...newEntry, visibility: e.target.value }),
        },
      ],
    },
    {
      fieldset: "none",
      children: [
        {
          labelName: "Comment",
          type: "text",
          id: "comment-input",
          name: "comment-input",
          value: newEntry?.comment,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewEntry({ ...newEntry, comment: e.target.value });
          },
        },
      ],
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

  const renderFields = (input: Fieldset) => {
    return (
      <>
        {input.fieldset == "none" ? (
          <div key={`field-${input.children[0].id}`}>
            <label
              htmlFor={input.children[0].id}
              key={`Lab-${input.children[0].id}`}
            >
              {input.children[0].labelName}
            </label>
            <input
              key={input.children[0].id}
              type={input.children[0].type}
              id={input.children[0].id}
              value={input.children[0].value}
              onChange={input.children[0].onChange}
            ></input>
          </div>
        ) : (
          <div key={`field-${input.children[0].id}`}>
            <fieldset id={input.fieldset} key={`Fs-${input.children[0].id}`}>
              <legend key={`Leg-${input.children[0].id}`}>
                {input.fieldset}
              </legend>
              {input.children.map((child: InputForm): ReactNode => {
                return (
                  <>
                    <label htmlFor={child.id} key={`Lab-${child.id}`}>
                      {child.labelName}
                    </label>
                    <input
                      key={`Inp-${child.id}`}
                      id={child.id}
                      type={child.type}
                      name={child.name}
                      value={child.value}
                      checked={child.checked}
                      onChange={(e) => child.onChange(e)}
                    ></input>
                  </>
                );
              })}
            </fieldset>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <section id="form-container">
        <form onSubmit={(e) => submitForm(e)} id="newEntry-form">
          {inputElements.map(renderFields)}
          <button type="submit" id="submit-button">
            add
          </button>
        </form>
      </section>
    </>
  );
};

export default NewEntryForm;
