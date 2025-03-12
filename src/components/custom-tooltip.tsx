import { format } from "date-fns";
import { Separator } from "./ui/separator";

interface PayloadItem {
  payload: {
    date: Date;
    income: number;
    expenses: number;
  };
}

interface CustomTooltipProps {
  active: boolean;
  payload: PayloadItem[];
}

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active) return null;
  const date = payload[0].payload.date;
  const income = payload[0].payload.income;
  const expenses = payload[1].payload.expenses;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className=" text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "MMM dd, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded full" />
            <p className="text-sm text-muted-foreground">Income</p>

            <p className="text-sm font-medium text-right">{income}</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-red-500 rounded full" />
            <p className="text-sm text-muted-foreground">Expenses</p>

            <p className="text-sm font-medium text-right">{expenses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
