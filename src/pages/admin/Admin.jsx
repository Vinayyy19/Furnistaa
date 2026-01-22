import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Options from "./options/Options";
import DashBoard from "./Componenets/DashBoard";
import Orders from "./Componenets/Orders";
import Products from "./Componenets/Products";
import AdminSetting from "./Componenets/AdminSetting";
import AdminLogout from "./Componenets/SubPart/AdminLogout";
import AdminMessages from "./Componenets/AdminMessages";

const Admin = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex bg-[#141414] text-white overflow-hidden">
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 md:z-auto
          w-64 h-full bg-black
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Options />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center p-4 bg-black border-b border-gray-800">
          <button onClick={() => setOpen(true)} className="text-2xl mr-4 cursor-pointer">
            ☰
          </button>

          <span className="font-semibold">Admin Panel</span>

          <h1 className="text-primary cursor-pointer font-extrabold text-3xl ml-auto">
            Furnista
          </h1>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="setting" element={<AdminSetting />} />
            <Route path="customer-msg" element={<AdminMessages />} />
            <Route path="logout" element={<AdminLogout />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
