import * as React from "react";
import { RouteConfig } from "../types";
import { stringify, validate } from "../utils";
import { SearchParamsContext } from "../context/SearchParams";

type UseSearchParamsUtils<T> = {
  setQuery: (input: Partial<T>) => void;
  clearQuery: () => void;
};

type UseSearchParams<T> = T & UseSearchParamsUtils<T>;

export function useSearchParams<T extends RouteConfig[keyof RouteConfig]>({
  route: routeValidator,
}: {
  route: T;
}): UseSearchParams<ReturnType<T>> {
  const context = React.useContext(SearchParamsContext);
  if (!context) {
    throw new Error("Hook needs to be called inside of SearchParamsProvider");
  }

  const params = React.useMemo(
    () => validate(routeValidator, context.queryString),
    [routeValidator, context]
  );

  React.useEffect(() => {
    if (stringify(params) !== context.queryString) {
      context.router.replace(stringify(params));
    }
  }, [context.queryString, context.router, params]);

  const setQuery = React.useCallback(
    (input?: Partial<ReturnType<T>>) => {
      context.router.push(
        stringify(
          validate(
            routeValidator,
            input ? stringify({ ...params, ...input }) : undefined
          )
        )
      );
    },
    [context.router, routeValidator, params]
  );

  const clearQuery = React.useCallback(() => {
    context.router.push(stringify(validate(routeValidator)));
  }, [context.router, routeValidator, params]);

  return {
    ...params,
    setQuery,
    clearQuery,
  };
}
