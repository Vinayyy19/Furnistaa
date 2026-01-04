import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    try {
      await api.post("/orders/mock-payment-success");

      toast.success("Payment successful. Order booked!");

      navigate(`/user/history`);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to complete payment"
      );
    }
  };

  const handleFailure = () => {
    toast.error("Payment failed");
    navigate("/checkout");
  };

  return (
    <div className="bg-background-dark min-h-screen flex items-center justify-center">
      <div className="flex gap-10">
        <button
          onClick={handleSuccess}
          className="bg-green-600 w-48 h-24 text-2xl font-semibold rounded-lg hover:bg-green-500"
        >
          Success
        </button>

        <button
          onClick={handleFailure}
          className="bg-red-600 w-48 h-24 text-2xl font-semibold rounded-lg hover:bg-red-500"
        >
          Failure
        </button>
      </div>
    </div>
  );
};

export default Payment;
