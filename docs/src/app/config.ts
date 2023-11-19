import { createSearchConfig } from "@search-params/react";
import { fallback, number, object, parse, string, optional } from "valibot";

const QueryParamsSchema = object({
  page: fallback(number(), 1),
  item: fallback(optional(string()), undefined),
});

export const searchConfig = createSearchConfig({
  home: (search) => parse(QueryParamsSchema, search),
});
