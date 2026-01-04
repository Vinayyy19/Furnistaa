const statusStyles = {
  Delivered: "bg-green-900 text-green-400",
  Processing: "bg-yellow-900 text-yellow-400",
  Cancelled: "bg-red-900 text-red-400",
};

const OrderRow = ({ order }) => {
  return (
    <div className="grid grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center px-4 py-3 border-b border-neutral-800 text-sm">
      <span className="text-white font-medium">{order.id}</span>

      <span className="text-neutral-300">{order.customer}</span>

      <span className="text-neutral-400">{order.date}</span>

      <span className="text-white font-medium">
        ₹{order.total.toLocaleString("en-IN")}
      </span>

      <span className="text-neutral-300">{order.payment}</span>

      <span
        className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
          statusStyles[order.status]
        }`}
      >
        {order.status}
      </span>
    </div>
  );
};

export default OrderRow;
