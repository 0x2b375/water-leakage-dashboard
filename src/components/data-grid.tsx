import Card from "./Card";
import { FiCpu, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
export const DataGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <Card
        title="Sensor Data"
        content="Real-time sensor metrics displayed here."
        footer="Updated now"
        icon={FiCpu}
      />
      <Card
        title="Alerts"
        content="Any leak alerts will show up here."
        footer="No alerts at the moment"
        icon={FiAlertCircle}
      />
      <Card
        title="Statistics"
        content="Water usage stats and analysis."
        footer="Last updated: 2 mins ago"
        icon={FiTrendingUp}
      />
    </div>
  );
};
