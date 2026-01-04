import { UserRound } from "lucide-react";
import AdminDetails from "./SubPart/AdminDetails";
import { useEffect, useState } from "react";
import LoadingBox from "../../../Loading/LoadingBox";
import api from "../../../../api/axios";
import authApi from "../../../../api/authApi";
import { toast } from "react-toastify";

const AdminSetting = () => {
  const [allAdmin, setAllAdmin] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "Sales Man",
  });

  const getAdmin = async () => {
    try {
      const res = await api.get("/admin/getAdmin");
      setAllAdmin(res.data.admins || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const registerAdmin = async () => {
    try {
      const payload = {
        name: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const res = await authApi.post("/admin/register", payload);

      setAllAdmin((prev) => [res.data.admin, ...prev]);
      toast.success("Admin created successfully");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "salesMan",
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";

      toast.error(message);
    }
  };

  const removeAdminFromUI = (id) => {
    setAllAdmin((prev) => prev.filter((a) => a._id !== id));
  };

  if (loading) return <LoadingBox />;

  return (
    <div className="p-5 space-y-8 overflow-auto hide-scrollbar h-screen">
      <div>
        <h1 className="text-white text-3xl font-bold">Add Admin</h1>
        <p className="text-neutral-400">Manage Admin and Sales Man accounts</p>
      </div>
      <div className="border border-neutral-700 rounded-xl bg-[#141414]">
        <div className="flex items-center gap-2 p-4 text-white text-xl font-semibold">
          <UserRound />
          <span>Admin Information</span>
        </div>

        <div className="border-t border-neutral-700" />

        <div className="p-4 space-y-6">
          <div className="flex gap-4">
            <input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="flex-1 p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
            />

            <input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="flex-1 p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
            />
          </div>

          <input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
          />

          <div className="flex gap-4">
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="flex-1 p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
            />

            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="flex-1 p-3 bg-neutral-800 border border-neutral-600 rounded-lg text-white"
            >
              <option value="salesMan">Sales Man</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              onClick={registerAdmin}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              Create Admin
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">
          Delete Admin Account
        </h2>

        <div className="space-y-4">
          {allAdmin.map((admin) => (
            <AdminDetails
              key={admin._id}
              admin={admin}
              onDelete={removeAdminFromUI}
              disableDelete={allAdmin.length === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
