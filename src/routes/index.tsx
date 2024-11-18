import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/stores/use-app-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Battery, DrillIcon, TrendingUp } from "lucide-react";
import { SitesPerformanceChart } from "@/components/dashboard/sites-performance-chart";
import { DrillingProgressChart } from "@/components/dashboard/drilling-progress-chart";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useFormsStore } from "@/lib/stores/use-forms-store";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});
function DashboardPage() {
  const { language } = useAppStore();
  const { maintenanceLogs, coreSamples, progressReports } = useFormsStore();

  // Calculate maintenance status distribution
  const maintenanceStatusData = maintenanceLogs
    .flatMap((log) => log.maintenanceItems)
    .reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const maintenanceChartData = Object.entries(maintenanceStatusData).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Calculate rock type distribution
  const rockTypeData = coreSamples.reduce((acc, sample) => {
    acc[sample.rockType] = (acc[sample.rockType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const rockTypeChartData = Object.entries(rockTypeData).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for the charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en"
                ? "Total Meters Drilled"
                : "Total Mètres Forés"}
            </CardTitle>
            <DrillIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,876 m</div>
            <p className="text-xs text-muted-foreground">
              {language === "en"
                ? "+20.1% from last month"
                : "+20.1% depuis le mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Recovery Rate" : "Taux de Récupération"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              {language === "en"
                ? "+2.4% from last month"
                : "+2.4% depuis le mois dernier"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Equipment Status" : "État des Équipements"}
            </CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/6</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "Active drilling rigs" : "Foreuses actives"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === "en" ? "Incidents" : "Incidents"}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {language === "en" ? "This month" : "Ce mois-ci"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DrillingProgressChart />
        <SitesPerformanceChart />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "en"
                ? "Equipment Maintenance Status"
                : "État de Maintenance des Équipements"}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {maintenanceChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === "en"
                ? "Rock Type Distribution"
                : "Distribution des Types de Roches"}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rockTypeChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {rockTypeChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
