import { describe, expect, test } from "vitest";
import { parseString, stringify } from ".";

describe("parseString", () => {
  test("returns an parsed object", () => {
    const validatedParams = parseString(
      "?foo=100&bar=goodbye&baz=true&qux=%5B%22one%22%2C%22two%22%5D"
    );
    expect(validatedParams).toStrictEqual({
      foo: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
  });
});

describe("stringify", () => {
  test("Returns an empty string when params are empty", () => {
    const stringifiedParams = stringify({});
    expect(stringifiedParams).toBe("");
  });

  test("Stringifies query params", () => {
    const stringifiedParams = stringify({
      foo: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
    expect(stringifiedParams).toBe(
      "?foo=100&bar=goodbye&baz=true&qux=%5B%22one%22%2C%22two%22%5D"
    );
  });

  test("Stringifies query params filtering out undefined, empty strings, null and empty objects", () => {
    const stringifiedParams = stringify({
      foo: 0,
      bar: "",
      baz: undefined,
      qux: [],
    });
    expect(stringifiedParams).toBe("?foo=0");
  });
});
