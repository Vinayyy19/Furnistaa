import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQty, removeCartItem } from "../../../Redux/cartSlice";
import Product from "./Product";

const YourCart = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // if (loading) {
  //   return <p className="text-gray-400 p-4">Loading cart...</p>;
  // }

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        items.map((item) => (
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
  );
};

export default YourCart;
