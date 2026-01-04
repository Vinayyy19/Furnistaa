import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartPricing } from "../../../Redux/cartSlice";

const Summary = () => {
  const {
    items,
    subtotal,
    protectFee,
    totalPayable,
  } = useSelector(selectCartPricing);

  if (!items || items.length === 0) {
    return (
      <div className="w-full max-w-md rounded-2xl bg-[#4a3f2f] p-6 text-white">
        <p className="text-neutral-300">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#4a3f2f] p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      <div className="space-y-3 text-neutral-300">
        <div className="flex justify-between">
          <p>Price</p>
          <p>₹{subtotal.toLocaleString()}</p>
        </div>

        <div className="flex justify-between">
          <p>Protect Promise Fee</p>
          <p>₹{protectFee}</p>
        </div>
      </div>

      <hr className="my-5 border-neutral-600" />

      <div className="flex justify-between items-center font-bold text-xl mb-5">
        <p>Total</p>
        <p>₹{totalPayable.toLocaleString()}</p>
      </div>

      <Link to="/checkout">
        <button className="w-full rounded-xl bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-500 cursor-pointer">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Summary;
