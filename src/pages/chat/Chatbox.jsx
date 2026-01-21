import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Leftbox from "./Leftbox";
import Rightbox from "./Rightbox";
import History from "./History/History";
import Return from "./returnPage/Return";
import Setting from "./setting/Setting";

const Chat = () => {
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
        <Leftbox />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className="md:hidden flex items-center p-4 bg-black border-b border-gray-800">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl mr-4 cursor-pointer"
          >
            ☰
          </button>
          <span className="font-semibold">User Panel</span>
        </div>

        <div className="flex-1 bg-surface-dark overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="chat" element={<Rightbox />} />
            <Route path="history" element={<History />} />
            <Route path="return" element={<Return />} />
            <Route path="setting" element={<Setting />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Chat;
