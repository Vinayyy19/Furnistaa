import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyOrdersChart = ({ data }) => {
  const chartData = [
    { month: "Last Month", orders: data.lastMonth },
    { month: "This Month", orders: data.thisMonth },
  ];

  return (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">
        Monthly Orders Comparison
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Bar dataKey="orders" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyOrdersChart;
