import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminProtectedRoute = ({ allowedRoles }) => {
  const { role, loading, isAuthenticated } = useAdminAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/admin/orders" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
