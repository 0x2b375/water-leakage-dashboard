import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { CustomTooltip } from "../custom-tooltip";

type Props = {
  data: {
    date: string;
    flowRate: number;
  }[];
};

export function AreaVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="flowRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#3d82f6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3d82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={d => format(parseISO(d), "HH:mm:ss")}
          style={{ fontSize: 12 }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Area
          type="monotone"
          dataKey="flowRate"
          stroke="#3d82f6"
          fill="url(#flowRate)"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
