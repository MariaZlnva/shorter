import { ChangeEventHandler } from "react";
import { IInputName } from "../../redux/types";
import "./Input.scss";
interface IInput {
  value: string;
  placeholder: string;
  type: string;
  name: IInputName;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const Input = ({ value, placeholder, type, name, onChange }: IInput) => {
  return (
    <input
      className="input input__error"
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      required
    ></input>
  );
};

export default Input;
