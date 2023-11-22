import * as React from "react";
import { SearchParamsConfig } from "../config";
import { SearchParamsContext } from "../context";
import { parseString, stringify } from "../utils";

type UseSearchParamsFn<TSearchParams> = {
  setQuery: (
    input:
      | Partial<TSearchParams>
      | ((prevParams: TSearchParams) => Partial<TSearchParams>),
    options?: { scroll: boolean }
  ) => void;
  clearQuery: (options?: { scroll: boolean }) => void;
};

type UseSearchParams<TSearchParams> = TSearchParams &
  UseSearchParamsFn<TSearchParams>;

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
    () =>
      routeValidator(
        parseString(context.query.toString())
      ) as ReturnType<TSchemaValidatorFn>,
    [routeValidator, context]
  );

  React.useEffect(() => {
    if (stringify(params) !== "?" + context.query.toString()) {
      context.router.replace(stringify(params));
    }
  }, [context.query.toString(), context.router, params]);

  const setQuery = React.useCallback<
    UseSearchParamsFn<ReturnType<TSchemaValidatorFn>>["setQuery"]
  >(
    (input, { scroll } = { scroll: false }) => {
      const getInput = (prevState: ReturnType<TSchemaValidatorFn>) =>
        typeof input === "function"
          ? { ...prevState, ...input(prevState) }
          : { ...prevState, ...input };
      const href = stringify(routeValidator(getInput(params)));
      context.router.push(href, { scroll });
    },
    [context.router, routeValidator, params]
  );

  const clearQuery = React.useCallback<
    UseSearchParamsFn<ReturnType<TSchemaValidatorFn>>["clearQuery"]
  >(
    ({ scroll } = { scroll: false }) => {
      const href = stringify(routeValidator({}));
      context.router.push(href, { scroll });
    },
    [context.router, routeValidator, params]
  );

  return {
    ...params,
    setQuery,
    clearQuery,
  };
}
