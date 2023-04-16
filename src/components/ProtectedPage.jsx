import { useUser } from "../hooks/UseUser";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

export const ProtectedPage = ({ children, roles }) => {
  const { getUser } = useUser();
  const { logout } = useAuth();

  //Authentication
  if (!getUser()) {
    return <Navigate to="/login" />;
  }
  if (Number(getUser()["http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration"]) < Date.now()){
    logout(); //Logout if session has expired
    return <Navigate to="/login" />;
  }

  //Authorization
  if (
    !roles?.includes(
      getUser()["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    )
  ) {
    return <Navigate to="/home" />;
  }

  return children;
};
