import { describe, expect, test } from "vitest";
import { stringify, validate } from ".";

const schemaValidatorFn = (search: Record<string, unknown>) => ({
  foo: search?.foo || 1,
  bar: search?.bar || "hello",
  baz: search?.baz || false,
  qux: search?.qux || undefined,
});

describe("validate", () => {
  test("Runs validator fn with fallback when no search string is provided", () => {
    const validatedParams = validate(schemaValidatorFn);
    expect(validatedParams).toStrictEqual({
      foo: 1,
      bar: "hello",
      baz: false,
      qux: undefined,
    });
  });

  test("Runs validator fn when search string is provided", () => {
    const validatedParams = validate(
      schemaValidatorFn,
      "?foo=100&bar=goodbye&baz=true&qux=%5B%22one%22%2C%22two%22%5D"
    );
    expect(validatedParams).toStrictEqual({
      foo: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
  });

  test("Runs validator fn when search params are provided", () => {
    const validatedParams = validate(schemaValidatorFn, {
      foo: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
    expect(validatedParams).toStrictEqual({
      foo: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
  });

  test("Runs validator fn with fallback when unexpected search string is provided", () => {
    const validatedParams = validate(
      schemaValidatorFn,
      "?foo2=100&bar=goodbye&baz=true&qux=%5B%22one%22%2C%22two%22%5D"
    );
    expect(validatedParams).toStrictEqual({
      foo: 1,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
  });

  test("Runs validator fn with fallback when unexpected search params are provided", () => {
    const validatedParams = validate(schemaValidatorFn, {
      foo2: 100,
      bar: "goodbye",
      baz: true,
      qux: ["one", "two"],
    });
    expect(validatedParams).toStrictEqual({
      foo: 1,
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
