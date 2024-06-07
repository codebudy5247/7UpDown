import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

const RequireUser = () => {
  const token = useAppSelector(
    (state) => state.authState.accessToken
  ) as string;

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireUser;
