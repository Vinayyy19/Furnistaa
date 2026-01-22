import { useNavigate } from "react-router-dom";

const User = () => {
  const name = localStorage.getItem("name") || "User";
  const navigate = useNavigate();

  return (
    <div>
      <span
        onClick={() => navigate("/user/history")}
        title="User"
        className="text-white font-bold cursor-pointer hover:underline"
      >
        Hello, {name}!
      </span>
    </div>
  );
};

export default User;
