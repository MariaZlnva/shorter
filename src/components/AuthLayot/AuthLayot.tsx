import { FormEventHandler, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteError } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import ButtonLink from "../ButtonLink/ButtonLink";
import "./AuthLayot.scss";

interface IAuthLayotProps {
  title: string;
  textBtn: string;
  textLinkBtn: string;
  path: string;
  textBtnSubmit: string;
  children: React.ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isValidForm: boolean;
  isErrorLogin?: boolean;
  isSuccessLogin?: boolean;
  isErrorRegister?: boolean;
  isSuccessRegister?: boolean;
}
const AuthLayot: React.FC<IAuthLayotProps> = ({
  title,
  textBtn,
  textLinkBtn,
  path,
  textBtnSubmit,
  children,
  onSubmit,
  isValidForm,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const {
    isErrorLogin,
    isSuccessRegister,
    isErrorRegister,
    messageErrorLogin,
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(deleteError());
  }, [pathname]);

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form" onSubmit={onSubmit}>
        {children}
        <div className="auth__confirm">
          <span className="auth__message">
            {pathname === "/sign-up" && isSuccessRegister && !isErrorRegister
              ? "Вы успешно зарегистрировались."
              : isErrorRegister &&
                !isSuccessRegister &&
                "Пользователь с таким именем уже зарегистрирован"}
            {pathname === "/sign-in" && isErrorLogin && `${messageErrorLogin}`}
          </span>
          <button type="submit" className="auth__btn" disabled={!isValidForm}>
            {textBtnSubmit}
          </button>
        </div>
      </form>
      <ButtonLink textBtn={textBtn} textLinkBtn={textLinkBtn} path={path} />
    </div>
  );
};

export default AuthLayot;
