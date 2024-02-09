import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/authActions";
import useValidation from "../../redux/hook/useValidation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthLayot from "../AuthLayot/AuthLayot";
import Input from "../Input/Input";

const Register = () => {
  const { values, onChange, isValidForm } = useValidation();
  const { isSuccessRegister, isErrorRegister } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccessRegister) {
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    }
  }, [isErrorRegister, isSuccessRegister]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    const { usernameRegister, passwordRegister } = values;

    dispatch(
      registerUser({ username: usernameRegister, password: passwordRegister })
    );
  };

  const handleChange = (evt) => {
    onChange(evt);
  };
  return (
    <AuthLayot
      title="Регистрация"
      textBtn="Уже зарегистрированы?"
      textLinkBtn="Войти"
      path="/sign-in"
      textBtnSubmit="Зарегистрироваться"
      onSubmit={handleRegisterSubmit}
      isValidForm={isValidForm}
      isErrorRegister={isErrorRegister}
      isSuccessRegister={isSuccessRegister}
    >
      <Input
        placeholder="Имя"
        value={values.usernameRegister || ""}
        type="text"
        name="usernameRegister"
        onChange={handleChange}
      />
      <Input
        placeholder="Пароль"
        value={values.passwordRegister || ""}
        type="password"
        name="passwordRegister"
        onChange={handleChange}
      />
    </AuthLayot>
  );
};

export default Register;
