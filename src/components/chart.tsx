"use client";

import { format } from "date-fns";
import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { AreaVariant } from "./Charts/aria-variant";
import { BarVariant } from "./Charts/bar-variant";
import { LineVariant } from "./Charts/line-variant";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DatePicker } from "./ui/date-picker"; // ✅ Your reusable date picker
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

type FlowData = {
  date: string; // "yyyy-MM-dd"
  flowRate: number;
};

type Props = {
  data?: FlowData[];
};

const defaultData: Props["data"] = [];

export function Chart({ data = defaultData }: Props) {
  const [chartType, setChartType] = useState("area");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  const filteredData = selectedDate
    ? data?.filter(entry => entry.date === format(selectedDate, "yyyy-MM-dd"))
    : data;

  return (
    <Card className="w-full border-none drop-shadow-sm">
      <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Water Flow</CardTitle>
        <div className="flex flex-wrap gap-3 items-center">
          <DatePicker date={selectedDate} onChange={setSelectedDate} />
          <Select defaultValue={chartType} onValueChange={onTypeChange}>
            <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">
                <div className="flex items-center">
                  <AreaChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Area Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="line">
                <div className="flex items-center">
                  <LineChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Line Chart</p>
                </div>
              </SelectItem>
              <SelectItem value="bar">
                <div className="flex items-center">
                  <BarChart3 className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Bar Chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {filteredData?.length === 0
          ? (
              <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                <FileSearch className="size-6 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  No data for this chart
                </p>
              </div>
            )
          : (
              <>
                {chartType === "area" && <AreaVariant data={filteredData ?? []} />}
                {chartType === "line" && <LineVariant data={filteredData ?? []} />}
                {chartType === "bar" && <BarVariant data={filteredData ?? []} />}
              </>
            )}
      </CardContent>
    </Card>
  );
}

export function ChartLoading() {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
}
