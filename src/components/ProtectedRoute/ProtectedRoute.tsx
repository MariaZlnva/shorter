import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
