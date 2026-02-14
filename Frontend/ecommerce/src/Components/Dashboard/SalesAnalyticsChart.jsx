import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const SalesAnalyticsChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-400">No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
    
      <BarChart data={data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label"  textAnchor="end" />
        <YAxis />
 <Tooltip
          formatter={(value) => [`₹${value}`, "Revenue"]}
        />

        <Bar
          dataKey="revenue"   // ✅ MATCHES YOUR DATA
          fill="#4ade80"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesAnalyticsChart;
