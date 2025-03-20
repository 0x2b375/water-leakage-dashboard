import { FiAlertCircle, FiCpu, FiTrendingUp } from "react-icons/fi";

import DataCard, { DataCardLoading } from "./data-card";

export function DataGrid() {
  const isLoading = false;
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Sensor Data"
        content="Real-time sensor metrics displayed here."
        footer="Updated now"
        icon={FiCpu}
      />
      <DataCard
        title="Alerts"
        content="Any leak alerts will show up here."
        footer="No alerts at the moment"
        icon={FiAlertCircle}
      />
      <DataCard
        title="Statistics"
        content="Water usage stats and analysis."
        footer="Last updated: 2 mins ago"
        icon={FiTrendingUp}
      />
    </div>
  );
}
