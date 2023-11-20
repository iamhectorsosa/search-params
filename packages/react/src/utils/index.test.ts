import { describe, expect, test } from "vitest";
import { validate } from ".";

const schemaValidatorFn = (search: Record<string, unknown>) => ({
  foo: search.foo || 1,
});

describe("validate", () => {
  test("Runs validator fn with fallback when no search string is provided", () => {
    const validatedParams = validate(schemaValidatorFn);
    expect(validatedParams).toStrictEqual({ foo: 1 });
  });

  test("Runs validator fn when search string is provided", () => {
    const validatedParams = validate(schemaValidatorFn, "?foo=100");
    expect(validatedParams).toStrictEqual({ foo: 100 });
  });

  test("Runs validator fn when search params are provided", () => {
    const validatedParams = validate(schemaValidatorFn, { foo: 100 });
    expect(validatedParams).toStrictEqual({ foo: 100 });
  });

  test("Runs validator fn with fallback when unexpected search string is provided", () => {
    const validatedParams = validate(schemaValidatorFn, "?bar=100");
    expect(validatedParams).toStrictEqual({ foo: 1 });
  });

  test("Runs validator fn with fallback when unexpected search params are provided", () => {
    const validatedParams = validate(schemaValidatorFn, { wrong: 100 });
    expect(validatedParams).toStrictEqual({ foo: 1 });
  });
});
