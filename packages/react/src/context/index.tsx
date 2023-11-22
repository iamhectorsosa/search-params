import * as React from "react";

type SearchParamsProviderProps = {
  query: URLSearchParams | string;
  router: {
    push: (href: string, options?: { scroll: boolean }) => void;
    replace: (href: string) => void;
  };
};

export const SearchParamsContext =
  React.createContext<SearchParamsProviderProps | null>(null);

export const SearchParamsProvider: React.FC<
  React.PropsWithChildren<SearchParamsProviderProps>
> = ({ children, query, router }) => {
  return (
    <SearchParamsContext.Provider value={{ query, router }}>
      {children}
    </SearchParamsContext.Provider>
  );
};
