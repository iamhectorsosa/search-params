import * as React from "react";

type QueryString = string;

type Router = {
  push: (href: string) => void;
  replace: (href: string) => void;
};

type SearchParamsContextType = {
  queryString: QueryString;
  router: Router;
};

export const SearchParamsContext =
  React.createContext<SearchParamsContextType | null>(null);

export const SearchParamsProvider: React.FC<
  React.PropsWithChildren<SearchParamsContextType>
> = ({ children, queryString, router }) => {
  return (
    <SearchParamsContext.Provider value={{ queryString, router }}>
      {children}
    </SearchParamsContext.Provider>
  );
};
