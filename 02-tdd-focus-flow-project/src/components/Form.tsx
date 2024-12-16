import { ItemWithoutID } from "../types";

interface FormProps {
  onSubmit: (item: ItemWithoutID) => void;
}

export default function Form({ onSubmit }: FormProps) {
  return <form>Form</form>;
}
