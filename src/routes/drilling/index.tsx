import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SitesPerformanceChart } from "@/components/dashboard/sites-performance-chart";
import { AlertTriangle, FileText, HelpCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Drill } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const Route = createFileRoute("/drilling/")({
  component: DrillingIndexPage,
});

function DrillingIndexPage() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meters Drilled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345m</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drill Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 sites added this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Core Recovery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42m/day</div>
            <p className="text-xs text-muted-foreground">
              +4m from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Site Performance Overview</CardTitle>
            <CardDescription>
              Drilling progress across all active sites
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SitesPerformanceChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Recent Activity</CardTitle>
              <HoverCard>
                <HoverCardTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm">
                    Real-time activity feed showing latest drilling reports, site updates, maintenance alerts and core sample analysis results. Enables drill site managers to monitor operations and respond quickly to issues.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
            <CardDescription>
              Latest drilling reports and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Site A-123 completed target depth
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Final depth: 450m | Core recovery: 97.8%
                  </p>
                </div>
                <div className="ml-auto text-sm">
                  <span className="font-medium">2h ago</span>
                  <button className="ml-2 text-primary hover:underline">View Report</button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <Drill className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New drilling started at Site B-456
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Target depth: 300m | Current progress: 45m
                  </p>
                </div>
                <div className="ml-auto text-sm">
                  <span className="font-medium">5h ago</span>
                  <button className="ml-2 text-primary hover:underline">Track Progress</button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Equipment maintenance required at Site C-789
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drill bit replacement needed after 200 hours
                  </p>
                </div>
                <div className="ml-auto text-sm">
                  <span className="font-medium">8h ago</span>
                  <button className="ml-2 text-primary hover:underline">Schedule</button>
                </div>
              </div>

              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Core sample analysis completed for Site D-234
                  </p>
                  <p className="text-sm text-muted-foreground">
                    RQD: 92% | Rock type: Granite
                  </p>
                </div>
                <div className="ml-auto text-sm">
                  <span className="font-medium">12h ago</span>
                  <button className="ml-2 text-primary hover:underline">View Results</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
