import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const User = () => {
  const { user } = useUser();
  if (!user) return null;
  const navigate = useNavigate();

  return (
    <div>
      <span
        onClick={() => navigate("/user/history")}
        title="User"
        className="text-white font-bold cursor-pointer hover:underline"
      >
        Hello, {user.name?.firstName || "User"}!
      </span>
    </div>
  );
};

export default User;
