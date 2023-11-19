import { type RouteConfig } from "../types";

function parseQueryParams(
  search: string
): Record<string, string | number | boolean | object> {
  const searchParams = new URLSearchParams(search);

  return [...searchParams.entries()].reduce<
    Record<string, string | number | boolean | object>
  >((params, [key, value]) => {
    const decodedValue = decodeURIComponent(value);
    try {
      const parsedValue = JSON.parse(decodedValue);
      params[key] = parsedValue;
    } catch (_e) {
      params[key] = decodedValue;
    }

    return params;
  }, {});
}

export function validate<T extends RouteConfig[keyof RouteConfig]>(
  routeValidator: T,
  search: string = ""
): ReturnType<T> {
  return routeValidator(parseQueryParams(search)) as ReturnType<T>;
}

export function stringify<T extends ReturnType<RouteConfig[keyof RouteConfig]>>(
  input: T,
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
