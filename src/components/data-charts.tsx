import { Chart } from "./chart";
import { SpendingPie } from "./spending-pie";

const data = {
  days: [
    { date: "2023-01-01", income: 1, expenses: 6 },
    { date: "2023-01-02", income: 3, expenses: 9 },
    { date: "2023-01-03", income: 5, expenses: 12 },
    { date: "2023-01-04", income: 6, expenses: 6 },
    { date: "2023-01-05", income: 1, expenses: 6 },
    { date: "2023-01-06", income: 9, expenses: 9 },
    { date: "2023-01-07", income: 11, expenses: 12 },
  ],
  categories: [
    { name: "Food", value: 100, expenses: 50 },
    { name: "Clothing", value: 50, expenses: 30 },
    { name: "Entertainment", value: 20, expenses: 10 },
  ],
};
export const DataCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data.categories} />
      </div>
    </div>
  );
};
