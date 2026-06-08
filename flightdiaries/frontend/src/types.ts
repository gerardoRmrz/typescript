export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type CallBackFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface InputForm {
  labelName: string;
  type: string;
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: CallBackFunction;
}

export interface Fieldset {
  fieldset: string;
  children: InputForm[];
}

export type NewEntryFormType = Fieldset[];
