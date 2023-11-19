type SchemaValidatorFn = (
  search: Record<string, unknown>
) => Record<string, unknown>;

export type SearchParamsConfig = Record<string, SchemaValidatorFn>;

export const createSearchParamsConfig = <TConfig extends SearchParamsConfig>(
  searchParamsConfig: TConfig
) => searchParamsConfig;
