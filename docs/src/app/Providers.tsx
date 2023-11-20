"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsProvider } from "@search-params/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SearchParamsProvider
      queryString={searchParams.toString()}
      router={{
        push: (href) => router.push(href, { scroll: false }),
        replace: (href) => router.replace(href, { scroll: false }),
      }}
    >
      {children}
    </SearchParamsProvider>
  );
};
