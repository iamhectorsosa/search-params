import { type SearchParamsConfig } from "../config";

type SearchParams = Record<string, string | number | boolean | object | unknown>;

function parseQueryParams(search: string): SearchParams {
  const searchParams = new URLSearchParams(search);

  return [...searchParams.entries()].reduce<SearchParams>(
    (params, [key, value]) => {
      const decodedValue = decodeURIComponent(value);
      try {
        const parsedValue = JSON.parse(decodedValue);
        params[key] = parsedValue;
      } catch (_e) {
        params[key] = decodedValue;
      }

      return params;
    },
    {}
  );
}

export function validate<
  TSchemaValidatorFn extends SearchParamsConfig[keyof SearchParamsConfig]
>(
  routeValidator: TSchemaValidatorFn,
  search: string | SearchParams = ""
): ReturnType<TSchemaValidatorFn> {
  return (
    typeof search === "string"
      ? routeValidator(parseQueryParams(search))
      : routeValidator(search)
  ) as ReturnType<TSchemaValidatorFn>;
}

export function stringify<
  TSchema extends ReturnType<SearchParamsConfig[keyof SearchParamsConfig]>
>(
  input: TSchema,
  config: { addQueryPrefix: boolean } = { addQueryPrefix: true }
): string {
  const filteredInput = Object.fromEntries(
    Object.entries({ ...input })
      .filter(
        ([, value]) => value !== undefined && value !== "" && value !== null
      )
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ])
  );
  if (Object.entries(filteredInput).length > 0) {
    const queryString = new URLSearchParams(filteredInput).toString();
    return config?.addQueryPrefix ? "?" + queryString : queryString;
  } else {
    return "";
  }
}