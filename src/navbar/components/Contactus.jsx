import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const Contactus = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/contactUs")}
      className="w-11 cursor-pointer h-11 flex items-center justify-center rounded-full bg-primary hover:brightness-110 transition"
    >
      <Phone className="text-black" size={20} />
    </button>
  );
};

export default Contactus