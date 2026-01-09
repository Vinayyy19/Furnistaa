import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

const Options = () => {
  return (
    <div className="h-full flex flex-col justify-between p-4">
      <div className="space-y-4">

        <NavLink to="/admin/dashboard" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Orders
        </NavLink>

        <NavLink to="/admin/chat" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Chat
        </NavLink>

        <NavLink to="/admin/setting" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Setting
        </NavLink>

        <NavLink to="/admin/customer-msg" className={({ isActive }) =>
          `block px-4 py-2 rounded ${isActive ? "bg-yellow-500 text-black" : "text-gray-300"}`
        }>
          Customer messages
        </NavLink>
      </div>

      <NavLink to="/admin/logout" className="block px-4 py-2 text-gray-300">
        <p className="flex gap-2"><LogOut /> Logout</p>
      </NavLink>
    </div>
  );
};

export default Options;
