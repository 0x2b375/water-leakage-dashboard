"use client";

import { useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiCpu, FiTrendingUp } from "react-icons/fi";
import { io } from "socket.io-client";
import { toast } from "sonner";

import { fetchLatestSensorData, fetchSensorData } from "@/services/api";

import DataCard, { DataCardLoading } from "./data-card";

const socket = io("http://localhost:3000");

type Props = {
  onLiveUpdate?: (data: {
    id: number;
    date: string;
    flowRate: number;
  }) => void;
};

export function DataGrid({ onLiveUpdate }: Props) {
  const [latestData, setLatestData] = useState<{
    flow_rate: number;
    received_date: string;
    id: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const [totalFlow, setTotalFlow] = useState(0);

  const lastSeenId = useRef<number | null>(null);
  const alertedIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    fetchSensorData()
      .then((historyData) => {
        const sumHistory = historyData.reduce((acc: any, cur: any) => acc + cur.flowRate, 0);
        setTotalFlow(sumHistory);

        if (historyData.length > 0) {
          lastSeenId.current = Math.max(...historyData.map((d: any) => d.id));
        }

        return fetchLatestSensorData();
      })
      .then((latest) => {
        if (latest.id && (lastSeenId.current === null || latest.id > lastSeenId.current)) {
          setLatestData({
            flow_rate: latest.flowRate,
            received_date: latest.receivedDate || new Date().toISOString(),
            id: latest.id,
          });
          setTotalFlow(prev => prev + latest.flowRate);
          lastSeenId.current = latest.id;
        }
      })
      .catch(err => console.error("Initial fetch error", err))
      .finally(() => setIsLoading(false));

    socket.on("flow-update", (data) => {
      setLatestData(data);
      setIsLive(true);

      if (lastSeenId.current === null || data.id > lastSeenId.current) {
        setTotalFlow(prev => prev + data.flow_rate);
        lastSeenId.current = data.id;
      }

      if (data.flow_rate > 50 && !alertedIds.current.has(data.id)) {
        alertedIds.current.add(data.id);
        toast(`⚠️ Possible leak detected! Flow rate: ${data.flow_rate.toFixed(2)} L/min`, {
          description: `Received at ${new Date(data.received_date).toLocaleString()}`,
          action: {
            label: "Dismiss",
            onClick: () => {}, // Optional: add extra logic on dismiss
          },
        });
      }

      onLiveUpdate?.({
        flowRate: data.flow_rate,
        date: new Date(data.received_date).toISOString(),
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
        content={`${latestData ? latestData.flow_rate.toFixed(2) : "0"} L/min`}
        footer={
          (
            <>
              {latestData?.received_date
                && `Received: ${new Date(
                  latestData.received_date,
                ).toLocaleString()}`}
              {isLive && (
                <span className="ml-2 text-green-600 text-sm">● Live</span>
              )}
            </>
          )
        }
        icon={FiCpu}
      />
      <DataCard
        title="Alerts"
        content={
          (latestData?.flow_rate ?? 0) > 50
            ? "⚠️ Possible leak detected!"
            : "No active leak alerts"
        }
        footer="Monitoring active"
        icon={FiAlertCircle}
      />
      <DataCard
        title="Usage Stats"
        content={`${(totalFlow / 1000).toFixed(2)} T`}
        footer="Live data from sensor"
        icon={FiTrendingUp}
      />
    </div>
  );
}
