import { useSelector } from "react-redux";
import { selectCartPricing } from "../../Redux/cartSlice";

const PriceDetails = () => {
  const {
    items = [],
    subtotal = 0,
    protectFee = 0,
    totalPayable = 0,
    savings = 0,
  } = useSelector(selectCartPricing);

  if (items.length === 0) return null;

  return (
    <div className="w-full p-4 max-w-md bg-[#3b3225] border rounded-md border-white shadow-sm">
      <div className="px-6 py-4 border-b border-white/20">
        <p className="text-white font-semibold tracking-wide">
          PRICE DETAILS
        </p>
      </div>

      <div className="px-6 py-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-neutral-200">Price</p>
          <p className="text-white font-medium">
            ₹{subtotal.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-neutral-200">Protect Promise Fee</p>
          <p className="text-white font-medium">
            ₹{protectFee.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="border-t mx-6 border-white/20"></div>

      <div className="px-6 py-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-white">
          Total Payable
        </p>
        <p className="text-lg font-semibold text-white">
          ₹{totalPayable.toLocaleString()}
        </p>
      </div>

      {savings > 0 && (
        <div className="px-6 py-4 border-t border-white/20">
          <p className="text-green-500 font-semibold">
            Your Total Savings on this order ₹{savings.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceDetails;
