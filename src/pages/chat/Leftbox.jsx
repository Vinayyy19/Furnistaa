import { Link } from "react-router-dom";
import Chat from "./Leftoptions/Chat";
import Logout from "./Leftoptions/Logout";
import OrderHis from "./Leftoptions/OrderHis";
import Return from "./Leftoptions/Return";
import Setting from "./Leftoptions/Setting";
import Profile from "./Profile";

const Leftbox = () => {
  return (
    <div className="h-full w-full bg-black flex flex-col justify-between overflow-auto hide-scrollbar">
      <div className="p-4 space-y-3">
          <Profile />
          <Link to={"/user/chat"}>
            <Chat />
          </Link>
          <Link to={"/user/history"}>
            <OrderHis />
          </Link>
          <Link to={"/user/return"}>
            <Return />
          </Link>
      </div>
      <div className="p-4 space-y-3">
        <Link to={"/user/setting"}>
          <Setting />
        </Link>
          <Logout />      
      </div>
    </div>
  );
};

export default Leftbox;
