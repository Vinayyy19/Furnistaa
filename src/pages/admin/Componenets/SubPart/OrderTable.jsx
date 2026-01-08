import { useState } from "react";
import api from "../../../../../api/axios";
import { toast } from "react-toastify";

const STATUS_FLOW = ["BOOKED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const statusColors = {
  BOOKED: "bg-blue-50 text-blue-700 ring-blue-200",
  CONFIRMED: "bg-purple-50 text-purple-700 ring-purple-200",
  SHIPPED: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  DELIVERED: "bg-green-50 text-green-700 ring-green-200",
};

const OrderTable = ({ orders = [], refreshOrders }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const [pendingChange, setPendingChange] = useState(null);

  const getAllowedStatuses = (current) => {
    const idx = STATUS_FLOW.indexOf(current);
    return STATUS_FLOW.slice(idx);
  };

  const confirmUpdate = async () => {
    const { orderId, status } = pendingChange;
    setUpdatingId(orderId);

    try {
      await api.patch(`/orders/edit/${orderId}/status`, { status });
      toast.success("Order status updated");
      refreshOrders();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
      setPendingChange(null);
    }
  };

  return (
    <>
      <div className="bg-neutral-300 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-gray-500">
            <tr className="border-b">
              <th className="px-6 py-4 text-left font-medium">Order</th>
              <th className="px-6 py-4 text-left font-medium">Customer</th>
              <th className="px-6 py-4 text-right font-medium">Amount</th>
              <th className="px-6 py-4 text-center font-medium">Status</th>
              <th className="px-6 py-4 text-center font-medium">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                const allowedStatuses = getAllowedStatuses(order.currentStatus);

                return (
                  <tr
                    key={order._id}
                    className="border-b last:border-b-0 hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-gray-900">
                        #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(order.createdAt).toDateString()}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {order.userId?.name?.firstName}{" "}
                        {order.userId?.name?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.userId?.email}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-right font-semibold text-gray-900">
                      ₹{order.pricing.finalAmount}
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ring-1 ${statusColors[order.currentStatus]}`}
                      >
                        {order.currentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      {updatingId === order._id ? (
                        <div className="flex justify-center">
                          <div className="h-5 w-5 border-2 border-neutral-300 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                      ) : (
                        <select
                          value={order.currentStatus}
                          onChange={(e) =>
                            setPendingChange({
                              orderId: order._id,
                              status: e.target.value,
                            })
                          }
                          className="rounded-md border border-neutral-300 bg-neutral-50
                                     px-3 py-1.5 text-sm text-gray-700
                                     focus:bg-white focus:ring-2 focus:ring-blue-500"
                        >
                          {allowedStatuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="py-16 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pendingChange && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[360px]">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Status Update
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Change order status to{" "}
              <span className="font-medium">
                {pendingChange.status}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingChange(null)}
                className="px-4 py-2 text-sm rounded-md border"
              >
                Cancel
              </button>

              <button
                onClick={confirmUpdate}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTable;
