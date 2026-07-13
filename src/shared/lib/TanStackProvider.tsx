"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren, useState } from "react";

import {
  DEFAULT_GC_TIME,
  DEFAULT_STALE_TIME,
} from "@/shared/constants/queryOptions";
import { cn } from "@/shared/lib/cn";

const TanStackProvider = ({ children }: PropsWithChildren) => {
  // QueryClient를 렌더마다 새로 만들면 캐시가 통째로 버려지므로 인스턴스를 고정한다.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: DEFAULT_STALE_TIME,
            gcTime: DEFAULT_GC_TIME,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className={cn("flex min-h-screen flex-col")}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
};

export default TanStackProvider;
