import { Routes, Route,Navigate } from "react-router-dom";
import Leftbox from "./Leftbox";
import Rightbox from "./Rightbox";
import History from "./History/History";
import Return from "./returnPage/Return";
import Setting from "./setting/Setting";

const Chat = () => {
  return (
    <div className="h-screen text-white flex">

      <div className="w-1/4">
        <Leftbox />
      </div>

      <div className="w-3/4 bg-surface-dark">
        <Routes>
          <Route path="chat" element={<Rightbox />} />
          <Route path="history" element={<History />} />
          <Route path="return" element={<Return />} />
          <Route path="setting" element={<Setting />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Chat;
