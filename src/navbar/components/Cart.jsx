import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      onClick={() => navigate("/cart")}
      className="relative flex items-center justify-center h-11 w-11 rounded-full cursor-pointer bg-primary hover:brightness-110 transition"
    >
      <ShoppingCart size={20} className="text-black" />

      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 text-[11px] font-semibold flex items-center justify-center rounded-full bg-black text-white">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default Cart;
