import { createSearchParamsConfig } from "@search-params/react";
import { fallback, number, object, parse, string, optional } from "valibot";

const searchParamsSchema = object({
  page: fallback(number(), 1),
  item: fallback(optional(string()), undefined),
});

export const config = createSearchParamsConfig({
  home: (search) => parse(searchParamsSchema, search),
});
