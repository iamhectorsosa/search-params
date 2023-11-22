# Search Params

Read and write [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) with full type-safety using `@search-params/react` using any React Framework and any schema validation library.

## Documentation

For usage development reference the project's [readme.md](../../readme.md) for more detailed information.

## Introduction

This project is heavily inspired by TanStack's Router [Search Params](https://tanstack.com/router/v1/docs/guide/search-params) with the exception that (a) it isn't limited to a specific React framework and (b) it reads and writes Search Params using the same hook.

### Why Search Params?

The URL Search Params is perfectly able to act as a form of global state. If you would like to know more about this, give TanStack's Router [Search Params, the "OG" State Manager](https://tanstack.com/router/v1/docs/guide/search-params#search-params-the-og-state-manager) a read.

## Getting Started

### 1. Set up the provider

Use `SearchParamsProvider` and pass in (a) the URL query (URLSearchParams or string) and (b) router methods from your framework of choice. This provider allows `@search-params/react` to read and write Search Params with any React framework. The example below is using Next.

#### Type Declaration `SearchParamsProvider`

```ts
type SearchParamsProviderProps = {
  query: URLSearchParams | string;
  router: {
    push: (href: string, options?: { scroll: boolean }) => void;
    replace: (href: string) => void;
  };
};
```

```tsx
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsProvider } from "@search-params/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SearchParamsProvider query={searchParams} router={router}>
      {children}
    </SearchParamsProvider>
  );
};
```

### 2. Set up your schema validations

Use `createSearchParamsConfig` to create a config object to handle all validations. You can choose any schema validation library (i.e. Valibot, Zod, Yup, etc..), or write your own, to handle your validations.

```ts
import { createSearchParamsConfig } from "@search-params/react";
import { fallback, number, object, parse, string, optional } from "valibot";

const searchParamsSchema = object({
  page: fallback(number([minValue(1)]), 1),
  item: fallback(optional(string()), undefined),
});

export const config = createSearchParamsConfig({
  home: (search) => parse(searchParamsSchema, search),
});
```

## Usage

#### Type Declaration `useSearchParams`

```ts
type UseSearchParams<TSearchParams> = TSearchParams {
  setQuery: (
    input:
      | Partial<TSearchParams>
      | ((prevParams: TSearchParams) => Partial<TSearchParams>),
    options?: { scroll: boolean }
  ) => void;
  clearQuery: (options?: { scroll: boolean }) => void;
};
```

### Read Search Params

Pass your route's config / schema validator as your function's argument.

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { page, item } = useSearchParams({
    // ˄ page: number;
    // ˄ item: string | undefined;
    route: config.home,
  });
}
```

### Set Search Params

Supports functional updates and scrolling (if your router supports it).

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { setQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <div>
      <Input
        type="text"
        onChange={(e) =>
          setQuery({
            item: e.currentTarget.value,
          })
        }
      />
      <button
        onClick={() =>
          setQuery(({ page }) => ({
            page: page + 1,
          }))
        }
      >
        Add +1
      </button>
    </div>
  );
}
```

### Clear Search Params

Supports scrolling if your router supports it.

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <button onClick={() => clearQuery({ scroll: true })}>
      Clear Search Params
    </button>
  );
}
```

## Feedback or Issues

Please create an issue using [GitHub Issues](https://github.com/iamhectorsosa/search-params/issues)
