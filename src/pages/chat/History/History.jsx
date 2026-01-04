import { useEffect, useState } from "react";
import HisComp from "./HisComp";
import api from "../../../../api/axios";
import LoadingBox from "../../../Loading/LoadingBox";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  if (loading) return <LoadingBox />;
  return (
    <div className="h-screen p-5 overflow-auto space-y-6">
      {orders.length === 0 ? (
        <div className="h-full flex items-center justify-center text-neutral-400 text-lg">
          You haven’t placed any orders yet.
        </div>
      ) : (
        orders.map((order) => <HisComp key={order._id} order={order} />)
      )}
    </div>
  );
};

export default History;
