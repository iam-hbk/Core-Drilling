import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppStore } from "@/lib/stores/use-app-store";

const data = [
  {
    site: "Site A",
    planned: 400,
    completed: 350,
  },
  {
    site: "Site B",
    planned: 300,
    completed: 290,
  },
  {
    site: "Site C",
    planned: 500,
    completed: 480,
  },
  {
    site: "Site D",
    planned: 450,
    completed: 420,
  },
];

export function SitesPerformanceChart() {
  const { language } = useAppStore();

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          {language === "en" ? "Sites Performance" : "Performance des Sites"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="site" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {language === "en" ? "Planned" : "Prévu"}:{" "}
                            {payload[0].value}m
                          </span>
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {language === "en" ? "Completed" : "Complété"}:{" "}
                            {payload[1].value}m
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Bar
              dataKey="planned"
              fill="#2563eb"
              name={language === "en" ? "Planned" : "Prévu"}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completed"
              fill="#16a34a"
              name={language === "en" ? "Completed" : "Complété"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
