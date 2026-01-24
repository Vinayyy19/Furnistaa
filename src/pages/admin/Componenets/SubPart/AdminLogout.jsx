import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../../api/axios";

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await api.post("/admin/logout-admin");
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        toast.success("Logged out successfully");
        navigate("/admin", { replace: true });
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default AdminLogout;
