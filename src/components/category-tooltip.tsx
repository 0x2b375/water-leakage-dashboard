import { Separator } from "./ui/separator";

type PayloadItem = {
  [x: string]: any;
  data: {
    name: string;
    value: number;
  }[];
};

type CustomTooltipProps = {
  active: boolean;
  payload: PayloadItem[];
};

export function CategoryTooltip({ active, payload }: CustomTooltipProps) {
  if (!active)
    return null;
  const name = payload[0].payload.name;
  const value = payload[0].payload.value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className=" text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex justify-between items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded full" />
            <p className="text-sm text-muted-foreground">Expenses</p>

            <p className="text-sm font-medium text-right">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
