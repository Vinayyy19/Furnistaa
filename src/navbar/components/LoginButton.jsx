import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/login")}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-white hover:bg-gray-100 cursor-pointer transition"
    >
      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
        <User size={18} />
      </div>
      <span className="text-sm font-medium text-gray-800">Login</span>
    </div>
  );
};

export default LoginButton;
