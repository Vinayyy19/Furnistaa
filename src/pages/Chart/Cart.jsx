import Summary from "./OrderSummary/Summary";
import YourCart from "./yourCart/YourCart";

const Cart = () => {
  return (
    <div className="flex p-4">
      <div className="w-3/5">
        <YourCart />
      </div>
      <div className="w-2/5 mt-16 ml-10">
        <Summary />
      </div>
    </div>
  );
};

export default Cart;
