import { createSearchParamsConfig } from "@search-params/react";
import {
  fallback,
  number,
  object,
  parse,
  string,
  optional,
  boolean,
  array,
  union,
  literal,
} from "valibot";

const searchParamsSchema = object({
  page: fallback(number(), 1),
  item: fallback(optional(string()), undefined),
  notifications: fallback(optional(boolean()), undefined),
  categories: fallback(
    optional(
      array(
        union([literal("electronics"), literal("consoles"), literal("gifts")])
      )
    ),
    undefined
  ),
});

export const config = createSearchParamsConfig({
  home: (search) => parse(searchParamsSchema, search),
});
