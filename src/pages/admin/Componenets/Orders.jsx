import { useEffect, useState } from "react";
import OrderTable from "./SubPart/OrderTable";
import SearchProd from "./SubPart/SearchProd";
import api from "../../../../api/axios";
import LoadingBox from "../../../Loading/LoadingBox";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/all-orders");
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <LoadingBox />;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Order Management</h1>
        <p className="text-neutral-400">
          View and update customer orders
        </p>
      </div>

      <SearchProd
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <OrderTable
        orders={orders}
        searchTerm={searchTerm}
        refreshOrders={fetchOrders}
      />
    </div>
  );
};

export default Orders;
