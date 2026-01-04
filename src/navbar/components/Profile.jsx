import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/user/chat")}
      className="w-11 cursor-pointer h-11 flex items-center justify-center rounded-full bg-primary hover:brightness-110 transition"
    >
      <User className="text-black" size={20} />
    </button>
  );
};

export default Profile;
