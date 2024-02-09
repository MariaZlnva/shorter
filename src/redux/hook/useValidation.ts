import { useCallback, useState } from "react";
import { IInputForm } from "../types";

const useValidation = () => {
  const [values, setValues] = useState<IInputForm>({
    usernameLogin: "",
    usernameRegister: "",
    passwordLogin: "",
    passwordRegister: "",
    link: "",
  });
  const [isValidForm, setIsValidForm] = useState(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues((values) => ({ ...values, [name]: value }));
    setIsValidForm(evt.target.closest("form")!.checkValidity());
  };
  const resetValidation = useCallback(
    (
      values = {
        usernameLogin: null,
        usernameRegister: null,
        passwordLogin: null,
        passwordRegister: null,
        link: null,
      }
    ) => {
      setValues(values);
    },
    [setValues]
  );

  return {
    values,
    setValues,
    onChange,
    isValidForm,
    setIsValidForm,
    resetValidation,
  };
};

export default useValidation;
