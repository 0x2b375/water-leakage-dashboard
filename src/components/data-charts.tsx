"use client";

import { Chart, ChartLoading } from "./chart";

type FlowData = {
  date: string;
  flowRate: number;
};

type Props = {
  data: FlowData[];
  isLoading: boolean;
};

export const DataCharts = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-6">
          <ChartLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-6">
        <Chart data={data} />
      </div>
    </div>
  );
};
