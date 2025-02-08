import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute() {
  const { userSession } = useContext(AuthContext);
  return userSession ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default ProtectedRoute;
