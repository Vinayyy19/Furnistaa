import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminRoleRoute = ({ children }) => {
  const { role, loading } = useAdminAuth();

  if (loading) return null;

  return role === "admin" ? children : <Navigate to="/admin/orders" replace />;
};

export default AdminRoleRoute;
