import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import StatCard from "./StatCard";
import OrdersStatusChart from "./OrdersStatus";
import MonthlyOrdersChart from "./MonthlyOrdersChart";
import TopCategoriesChart from "./TopCategoriesChart";
import DashboardSkeleton from "./DashboardSkeleton";
import ChartWrapper from "./ChartWrapper.jsx";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="p-6 text-red-400">Failed to load dashboard data</div>
    );
  }

  const { stats, ordersByStatus, monthlyComparison, topCategories } = data;

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-neutral-400 text-sm">
          Store performance & analytics overview
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Today's Orders" value={stats.todayOrders} />
        <StatCard label="This Month Orders" value={stats.thisMonthOrders} />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Pending Orders" value={stats.pendingOrders} />
        <StatCard label="Today's Users" value={stats.todayUsers} />
        <StatCard label="This Month Users" value={stats.thisMonthUsers} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Orders by Status">
          <OrdersStatusChart data={ordersByStatus} />
        </ChartWrapper>

        <ChartWrapper title="Monthly Orders Comparison">
          <MonthlyOrdersChart data={monthlyComparison} />
        </ChartWrapper>
      </div>
      <ChartWrapper title="Top Categories by Orders">
        <TopCategoriesChart data={topCategories} />
      </ChartWrapper>
    </div>
  );
};

export default Dashboard;
