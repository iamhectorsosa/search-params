type SearchParams = Record<
  string,
  string | number | boolean | object | unknown
>;

export function parseString(search: string): SearchParams {
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

export function stringify(input: SearchParams): string {
  const filteredInput = Object.fromEntries(
    Object.entries({ ...input })
      .filter(
        ([, value]) => value !== undefined && value !== "" && value !== null
      )
      .filter(([, value]) => {
        if (value && typeof value === "object") {
          return Object.entries(value).length !== 0;
        }
        return true;
      })
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value : JSON.stringify(value),
      ])
  );
  if (Object.entries(filteredInput).length > 0) {
    const queryString = new URLSearchParams(filteredInput).toString();
    return "?" + queryString;
  } else {
    return "";
  }
}
