import {
  LineChart,
  Line,
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
  { month: "Jan", actual: 1250, target: 2000, recovery: 92 },
  { month: "Feb", actual: 1800, target: 2000, recovery: 94 },
  { month: "Mar", actual: 2100, target: 2000, recovery: 95 },
  { month: "Apr", actual: 1900, target: 2000, recovery: 93 },
  { month: "May", actual: 2300, target: 2000, recovery: 96 },
  { month: "Jun", actual: 2200, target: 2000, recovery: 94 },
];

export function DrillingProgressChart() {
  const { language } = useAppStore();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>
          {language === "en" ? "Monthly Progress" : "Progression Mensuelle"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
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
                          <span className="font-bold text-muted-foreground">
                            {language === "en" ? "Metrics" : "Métriques"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {language === "en" ? "Actual" : "Réel"}:{" "}
                            {payload[0].value}m
                          </span>
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {language === "en" ? "Target" : "Objectif"}:{" "}
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
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="actual"
              stroke="#2563eb"
              name={language === "en" ? "Actual (meters)" : "Réel (mètres)"}
              strokeWidth={2}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="target"
              stroke="#dc2626"
              name={language === "en" ? "Target (meters)" : "Objectif (mètres)"}
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="recovery"
              stroke="#16a34a"
              name={language === "en" ? "Recovery (%)" : "Récupération (%)"}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
