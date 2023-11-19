import * as React from "react";
import { SearchParamsConfig } from "../config";
import { SearchParamsContext } from "../context";
import { stringify, validate } from "../utils";

type UseSearchParamsUtils<TSchema> = {
  setQuery: (
    input?: Partial<TSchema> | ((prevParams: TSchema) => Partial<TSchema>)
  ) => void;
  clearQuery: () => void;
};

type UseSearchParams<TSchema> = TSchema & UseSearchParamsUtils<TSchema>;

export function useSearchParams<
  TSchemaValidatorFn extends SearchParamsConfig[keyof SearchParamsConfig]
>({
  route: routeValidator,
}: {
  route: TSchemaValidatorFn;
}): UseSearchParams<ReturnType<TSchemaValidatorFn>> {
  const context = React.useContext(SearchParamsContext);
  if (!context) {
    throw new Error("Hook needs to be called inside of SearchParamsProvider");
  }

  const params = React.useMemo<ReturnType<TSchemaValidatorFn>>(
    () => validate(routeValidator, context.queryString),
    [routeValidator, context]
  );

  React.useEffect(() => {
    if (stringify(params) !== context.queryString) {
      context.router.replace(stringify(params));
    }
  }, [context.queryString, context.router, params]);

  const setQuery = React.useCallback<
    UseSearchParamsUtils<ReturnType<TSchemaValidatorFn>>["setQuery"]
  >(
    (input) => {
      const updateParams = (prevState: ReturnType<TSchemaValidatorFn>) => {
        if (typeof input === "function") {
          return { ...prevState, ...input(prevState) };
        }
        return input ? { ...prevState, ...input } : prevState;
      };

      const updatedParams = validate(routeValidator, updateParams(params));
      const href = stringify(updatedParams);
      context.router.push(href);
    },
    [context.router, routeValidator, params]
  );

  const clearQuery = React.useCallback<
    UseSearchParamsUtils<ReturnType<TSchemaValidatorFn>>["clearQuery"]
  >(() => {
    const href = stringify(validate(routeValidator));
    context.router.push(href);
  }, [context.router, routeValidator, params]);

  return {
    ...params,
    setQuery,
    clearQuery,
  };
}
