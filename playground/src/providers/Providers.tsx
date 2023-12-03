import * as React from "react";
import { SearchParamsProvider } from "@search-params/react";
import { useSearchParams } from "react-router-dom";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <SearchParamsProvider
      query={searchParams}
      router={{
        push: (href) => setSearchParams(href),
        replace: (href) => setSearchParams(href),
      }}
    >
      {children}
    </SearchParamsProvider>
  );
};
