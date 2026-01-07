import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {useEffect} from "react";

const ProtectedRoute = () => {
  const { setUser } = useUser();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      setUser(null);
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
