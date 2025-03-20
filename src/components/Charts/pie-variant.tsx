import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { CategoryTooltip } from "../category-tooltip";

const COLORS = ["#0062FE", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export function PieVariant({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          content={({ payload }: any) => (
            <ul className="flex flex-col space-y-2">
              {payload.map((entry: any) => (
                <li
                  key={entry.value}
                  className="flex items-center space-x-2"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    <span className="text-sm">
                      {`${(
                        entry.payload.percent * 100
                      ).toPrecision(2)}%`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          labelLine={false}
          label={false}
        >
          {data.map((_entry, index) => (
            <Cell key={_entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
