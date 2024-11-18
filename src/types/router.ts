import { router } from "@/lib/router";
import { QueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  
  interface RouterContext {
    queryClient: QueryClient;
  }
} 