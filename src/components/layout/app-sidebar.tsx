"use client"

import * as React from "react"
import { 
  Calendar, 
  Command, 
  Home, 
  Settings, 
  Shovel, 
  FileText,
  FormInput,
  ClipboardList
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

const mainNavItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    exact: true,
  },
  {
    title: "Drilling",
    to: "/drilling",
    icon: Shovel,
    exact: false,
    items: [
      {
        title: "Overview",
        to: "/drilling",
      },
      {
        title: "Forms",
        to: "/drilling/forms",
      },
      {
        title: "Reports",
        to: "/drilling/reports",
      },
    ]
  },
  {
    title: "Reports",
    to: "/reports",
    icon: Calendar,
    exact: false,
    items: [
      {
        title: "Overview",
        to: "/reports",
      },
      {
        title: "Daily Reports",
        to: "/reports/daily",
      },
    ]
  },
  {
    title: "Settings",
    to: "/settings",
    icon: Settings,
    exact: false,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Core Diamond Drilling</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.to}
                    activeProps={{
                      className: "font-bold",
                    }}
                    activeOptions={{ exact: item.exact }}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={subItem.to}
                            activeProps={{
                              className: "font-bold",
                            }}
                          >
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                  <span className="text-lg font-semibold">U</span>
                </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">User</span>
                  <span className="truncate text-xs">user@example.com</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
