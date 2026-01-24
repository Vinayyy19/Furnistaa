import { LogOut } from "lucide-react";
import api from "../../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../Redux/cartSlice";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const dispatch = useDispatch(); 

const logoutUser = async () => {
  try {
    await api.post("/users/logout");
    toast.success("You have been logged out successfully.");
  } catch (error) {
    toast.info("Session already expired. Logged out.");
  } finally {
    setUser(null);
    dispatch(clearCart());
    navigate("/", { replace: true });
  }
};


  return (
    <button
      type="button"
      onClick={logoutUser}
      className="cursor-pointer w-full hover:text-black flex p-3 rounded-xl transition-all duration-200 hover:bg-primary hover:scale-[1.02] hover:shadow-lg"
    >
      <LogOut />
      <span className="ml-3">Logout</span>
    </button>
  );
};

export default Logout;
