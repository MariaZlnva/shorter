import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authActions";
import { deleteMessageErrorLogin } from "../../redux/authSlice";
import useValidation from "../../redux/hook/useValidation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AuthLayot from "../AuthLayot/AuthLayot";
import Input from "../Input/Input";

const Login = () => {
  const { values, onChange, isValidForm } = useValidation();
  const dispatch = useAppDispatch();
  const { isLoggedIn, isSuccessLogin, isToken } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isToken) {
      navigate("/");
    }
  }, [isToken, isSuccessLogin, isLoggedIn]);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    console.log(values);
    const { usernameLogin, passwordLogin } = values;

    dispatch(loginUser({ username: usernameLogin, password: passwordLogin }));
    dispatch(deleteMessageErrorLogin());
  };

  const handleChange = (evt) => {
    onChange(evt);
  };
  return (
    <AuthLayot
      title="Вход"
      textBtn="Ещё не зарегистрированы?"
      textLinkBtn="Зарегистрироваться"
      path="/sign-up"
      textBtnSubmit="Войти"
      onSubmit={handleLoginSubmit}
      isValidForm={isValidForm}
    >
      <Input
        placeholder="Имя"
        value={values.usernameLogin || ""}
        type="text"
        name="usernameLogin"
        onChange={handleChange}
      />
      <Input
        placeholder="Пароль"
        value={values.passwordLogin || ""}
        type="password"
        name="passwordLogin"
        onChange={handleChange}
      />
    </AuthLayot>
  );
};

export default Login;
