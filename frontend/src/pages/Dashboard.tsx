"use client";

import { useEffect, useRef, useState } from "react";

import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { fetchSensorData } from "@/services/api";

type FlowData = {
  id: number;
  date: string;
  flowRate: number;
};

export default function Dashboard() {
  const [chartData, setChartData] = useState<FlowData[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const lastSeenId = useRef<number | null>(null);

  useEffect(() => {
    fetchSensorData()
      .then((data) => {
        setChartData(data);
        if (data.length > 0) {
          lastSeenId.current = data[data.length - 1].id;
        }
      })
      .finally(() => setIsHistoryLoaded(true));
  }, []);

  const handleLiveUpdate = (data: { id: number; date: string; flowRate: number }) => {
    if (lastSeenId.current && data.id <= lastSeenId.current) {
      return;
    }
    lastSeenId.current = data.id;

    setChartData(prev =>
      [...prev, {
        id: data.id,
        date: new Date(data.date).toISOString(),
        flowRate: data.flowRate,
      }],
    );
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid onLiveUpdate={handleLiveUpdate} />
      <DataCharts data={chartData} isLoading={!isHistoryLoaded} />
    </div>
  );
}
