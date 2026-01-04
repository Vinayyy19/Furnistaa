import { useDispatch, useSelector } from "react-redux";
import Product from "../Chart/yourCart/Product";
import { updateCartQty, removeCartItem } from "../../Redux/cartSlice";

const FinalSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="w-full bg-[#3b3225] border rounded-md border-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#604e34] text-white p-4 flex items-center gap-4">
        <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-sm font-semibold text-blue-600">
          3
        </div>
        <div className="text-2xl font-bold">Order Summary</div>
      </div>

      {/* Products */}
      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-neutral-300">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <Product
              key={`${item.product._id}-${item.variant._id}`}
              item={item}
              onUpdateQty={(qty) =>
                dispatch(
                  updateCartQty({
                    productId: item.product._id,
                    variantId: item.variant._id,
                    quantity: qty,
                  })
                )
              }
              onRemove={() =>
                dispatch(
                  removeCartItem({
                    productId: item.product._id,
                    variantId: item.variant._id,
                  })
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FinalSummary;
