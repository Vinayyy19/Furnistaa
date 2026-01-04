import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin" || role === "salesMan";

  return isAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminProtectedRoute;
