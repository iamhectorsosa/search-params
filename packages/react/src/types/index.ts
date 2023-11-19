export type RouteConfig = Record<
  string,
  (search: Record<string, unknown>) => Record<string, unknown>
>;
