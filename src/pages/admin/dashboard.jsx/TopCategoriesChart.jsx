import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TopCategoriesChart = ({ data }) => {
  return (
    <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">
        Top Categories
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <YAxis dataKey="category" type="category" />
          <XAxis type="number" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCategoriesChart;
