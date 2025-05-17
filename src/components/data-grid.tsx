import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DataCard, { DataCardLoading } from "./data-card";
import { FiCpu, FiAlertCircle, FiTrendingUp } from "react-icons/fi";
import { fetchLatestSensorData } from "@/services/api";

const socket = io("http://localhost:3000");

type Props = {
  onLiveUpdate?: (data: {
    id: number;
    date: string;
    flowRate: number;
  }) => void;
};

export const DataGrid = ({ onLiveUpdate }: Props) => {
  const [latestData, setLatestData] = useState<{
    flow_rate: number;
    received_date: string;
    id: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetchLatestSensorData()
      .then((data) => {
        const formatted = {
          flow_rate: data.flowRate,
          received_date: data.receivedDate || new Date().toISOString(),
          id: data.id,
        };
        setLatestData(formatted);
        onLiveUpdate?.({
          flowRate: formatted.flow_rate,
          date: formatted.received_date.split("T")[0],
          id: data.id,
        });
        setIsLoading(false);
      })
      .catch((err) => console.error("Initial fetch error", err));

    socket.on("flow-update", (data) => {
      setLatestData(data);
      setIsLive(true);

      onLiveUpdate?.({
        flowRate: data.flow_rate,
        date: data.received_date.split("T")[0],
        id: data.id,
      });
    });

    return () => {
      socket.off("flow-update");
    };
  }, [onLiveUpdate]);

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
        title="Current Flow Rate"
        content={`${latestData?.flow_rate.toFixed(2)} L/min`}
        footer={
          <>
            {latestData?.received_date &&
              `Received: ${new Date(
                latestData.received_date
              ).toLocaleString()}`}
            {isLive && <span className="ml-2 text-green-600 text-sm">● Live</span>}
          </>
        }
        icon={FiCpu}
      />
      <DataCard
        title="Alerts"
        content={
          (latestData?.flow_rate ?? 0) > 10
            ? "⚠️ Possible leak detected!"
            : "No active leak alerts"
        }
        footer="Monitoring active"
        icon={FiAlertCircle}
      />
      <DataCard
        title="Usage Stats"
        content="View chart for breakdown"
        footer="Live data from sensor"
        icon={FiTrendingUp}
      />
    </div>
  );
};
