import api from "../../../api/axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* Load Razorpay script */
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Continue = ({ allDetails, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const { data } = await api.post("/orders/create-order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        // LIVE MODE:
        // key: import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID,

        amount: data.amount * 100,
        currency: "INR",
        order_id: data.razorpayOrderId,

        prefill: {
          email,
        },

        handler: async (response) => {
          try {
            await api.post("/orders/Verify-order", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              deliveryAddress: allDetails.address,
            });

            dispatch(clearCart());
            toast.success("Payment successful. Order booked!");
            navigate("/user/history",{replace:true});
          } catch (err) {
            console.error("Verification failed:", err);
            toast.error(
              "Payment received but order verification failed. Please contact support."
            );
          }
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },

        theme: {
          color: "#facc15",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);
        toast.error(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error("Unable to initiate payment. Try again.");
    }
  };

  return (
    <div className="w-full text-white bg-[#3b3225] border rounded-md px-6 py-4 flex items-center justify-between">
      <p>
        Order confirmation will be sent on{" "}
        <span className="font-semibold">{email}</span>
      </p>

      <button
        onClick={handlePayment}
        disabled={!allDetails.address}
        className="border bg-yellow-400 cursor-pointer px-6 py-2 rounded text-black font-semibold hover:bg-yellow-300 disabled:bg-neutral-500"
      >
        CONTINUE
      </button>
    </div>
  );
};

export default Continue;
