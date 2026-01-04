import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  BOOKED: "#3b82f6",
  CONFIRMED: "#8b5cf6",
  PACKED: "#f59e0b",
  SHIPPED: "#eab308",
  DELIVERED: "#22c55e",
};

const OrdersStatusChart = ({ data }) => {
  return (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">
        Orders by Status
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={COLORS[entry.status]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersStatusChart;
