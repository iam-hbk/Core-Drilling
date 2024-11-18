import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { router } from "./lib/router";
import { getQueryClient } from "./lib/query-client";
import "./index.css";

const queryClient = getQueryClient();

// Update router context with the real queryClient
router.options.context = { queryClient };

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        richColors
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
          },
        }}
        position="top-right"
      />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>,
  );
}
