import { logout } from "../../redux/authSlice";
import { deleteMessageErrorCreate } from "../../redux/linkSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./Header.scss";
const Header = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(deleteMessageErrorCreate());
  };
  return (
    <header className="header">
      <h1 className="header__logo">Shorter</h1>
      {isLoggedIn && (
        <button
          className="header__log-out"
          type="button"
          onClick={handleLogout}
        >
          Выйти
        </button>
      )}
    </header>
  );
};

export default Header;
