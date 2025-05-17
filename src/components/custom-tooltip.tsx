import { format, parseISO } from "date-fns";

import { Separator } from "./ui/separator";

type PayloadItem = {
  payload: {
    date: string;
    flowRate: number;
  };
};

type CustomTooltipProps = {
  active: boolean;
  payload: PayloadItem[];
};

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0)
    return null;

  const { date, flowRate } = payload[0].payload;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(parseISO(date), "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Flow Rate</p>
            <p className="text-sm font-medium text-right">
              {flowRate.toFixed(2)}
              {" "}
              L/min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
