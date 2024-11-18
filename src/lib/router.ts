import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { getQueryClient } from "./query-client";
import { QueryClient } from "@tanstack/react-query";

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient: getQueryClient(),
  },
});
