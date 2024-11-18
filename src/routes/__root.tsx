import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HeaderToggles } from "@/components/layout/header-toggles";

export const Route = createRootRoute({
  component: RootComponent,
});
function RootComponent() {
  const matches = useMatches();

  const breadcrumbItems = matches
    .map((match, index, array) => {
      const isLast = index === array.length - 1;
      const path = match.pathname;

      // Handle root path specially
      if (path === "/") {
        return (
          <React.Fragment key="home">
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link to="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {array.length > 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </React.Fragment>
        );
      }

      // Skip empty paths
      if (!path || path === "/") return null;

      // Get all segments of the path for nested routes
      const segments = path.split("/").filter(Boolean);
      const label = segments[segments.length - 1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Don't show if it's the same as the previous segment
      if (index > 0) {
        const prevPath = array[index - 1].pathname;
        const prevSegments = prevPath.split("/").filter(Boolean);
        const prevLabel = prevSegments[prevSegments.length - 1];
        if (prevLabel === segments[segments.length - 1]) {
          return null;
        }
      }

      return (
        <React.Fragment key={path}>
          <BreadcrumbItem className="hidden md:block">
            {isLast ? (
              <BreadcrumbPage>{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link to={path}>{label}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
        </React.Fragment>
      );
    })
    .filter(Boolean); // Remove null items

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-background px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
              </Breadcrumb>
            </div>
            <HeaderToggles />
          </header>
          <main className="flex-1 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
        {/* <TanStackRouterDevtools position="bottom-right" /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
