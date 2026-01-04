import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <h1
      onClick={() => navigate("/")}
      className="text-primary cursor-pointer font-extrabold text-3xl tracking-wide"
    >
      Furnista
    </h1>
  );
};

export default memo(Logo);
