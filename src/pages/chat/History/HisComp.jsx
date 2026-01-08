import { useState } from "react";

const STATUS_STYLE_MAP = {
  DELIVERED: "bg-green-100 text-green-700",
  BOOKED: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-700",
};

const formatDateTime = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


const HisComp = ({ order }) => {
  const [open, setOpen] = useState(false);

  if (!order || !order.items || order.items.length === 0) return null;

  const statusStyle =
    STATUS_STYLE_MAP[order.currentStatus] ||
    "bg-gray-100 text-gray-700";

  const firstItem = order.items[0];
  const itemCount = order.items.length;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden transition-shadow hover:shadow-sm">
      <div
        className="px-6 py-5 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex justify-between items-start gap-6">
          <div className="space-y-1">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${statusStyle}`}
            >
              {order.currentStatus}
            </span>

            <h2 className="text-base font-semibold text-gray-900 leading-snug">
              {firstItem.productName}
              {itemCount > 1 && (
                <span className="text-gray-500 font-normal">
                  {" "}+{itemCount - 1} more item{itemCount > 2 && "s"}
                </span>
              )}
            </h2>

            <p className="text-sm text-gray-500">
              Order #{order._id.slice(-6).toUpperCase()} ·{" "}
              {new Date(order.createdAt).toDateString()}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-gray-900">
              ₹{order.pricing.finalAmount}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {itemCount} item{itemCount > 1 && "s"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <p>
            Delivering to{" "}
            <span className="font-medium">
              {order.deliveryAddress.city} –{" "}
              {order.deliveryAddress.postalCode}
            </span>
          </p>

          <p className="text-xs text-gray-400">
            {open ? "Hide details ▲" : "View details ▼"}
          </p>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 border-t space-y-5 bg-gray-50">
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Color: {item.color} · Size: {item.size} · Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium text-gray-800">
                  ₹{item.subtotal}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 text-sm space-y-1 text-gray-600">
            <div className="flex justify-between">
              <span>Items total</span>
              <span>₹{order.pricing.itemsTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.pricing.shippingFee}</span>
            </div>

            <div className="flex justify-between font-semibold text-gray-900 pt-1">
              <span>Total paid</span>
              <span>₹{order.pricing.finalAmount}</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-900">
              Order activity
            </p>

            {order.events.map((event, idx) => (
              <div key={idx} className="flex gap-3 text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-green-500"></span>
                <div>
                  <p className="font-medium text-gray-800">
                    {event.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDateTime(event.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HisComp;
