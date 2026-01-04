import { Route, Routes, Navigate } from "react-router-dom";
import Options from "./options/Options";
import DashBoard from "./Componenets/DashBoard";
import Orders from "./Componenets/Orders";
import Chat from "./Componenets/Chat";
import Products from "./Componenets/Products";
import AdminSetting from "./Componenets/AdminSetting";
import AdminLogout from "./Componenets/SubPart/AdminLogout";

const Admin = () => {
  return (
    <div className="h-screen flex text-white overflow-hidden">

      <aside className="hidden md:block md:w-64 bg-black h-full sticky top-0">
        <Options />
      </aside>

      <div className="flex-1 bg-[#141414] p-6 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="chat" element={<Chat />} />
          <Route path="setting" element={<AdminSetting />} />
          <Route path="logout" element={<AdminLogout />} />

          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>

    </div>
  );
};

export default Admin;
