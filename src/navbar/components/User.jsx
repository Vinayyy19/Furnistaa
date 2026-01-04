import { useNavigate } from "react-router-dom";

const User = () => {
  const name = localStorage.getItem("name") || "User";
  const navigate = useNavigate();

  return (
    <div>
      <span
        onClick={() => navigate("/user/chat")}
        className="text-white font-bold cursor-pointer"
      >
        Hello, {name}!
      </span>
    </div>
  );
};

export default User;
