# Search Params

Read and update [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) with full type-safety.

## Documentation

Please visit our [Documentation](https://search-params-docs.vercel.app) for more detailed information.

## Setup

### 1. Set up the provider

First import `SearchParamsProvider` and pass in the query string and router methods from your framework of choice. The example below is using Next.

```tsx
"use client";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsProvider } from "@search-params/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SearchParamsProvider
      queryString={searchParams.toString()}
      router={{
        push: (href) => router.push(href),
        replace: (href) => router.replace(href),
      }}
    >
      {children}
    </SearchParamsProvider>
  );
};
```

This provider allows `@search-params/react` to read and update URL Search Params with your framework of choice. No adapters needed.

### 2. Configure your route validations

Import `createSearchParamsConfig` and create a config object to handle all validations. Can work with any validation library or with none at all if you want to manually write your validations.

```ts
import { createSearchParamsConfig } from "@search-params/react";
import { fallback, number, object, parse, string, optional } from "valibot";

const searchParamsSchema = object({
  page: fallback(number(), 1),
  item: fallback(optional(string()), undefined),
});

export const config = createSearchParamsConfig({
  home: (search) => parse(searchParamsSchema, search),
});
```

## Usage

### Hook Options

The `useSearchParams` hooks gives you typesafety for all query parameters and its methods: `setQuery` (accepts funtional updates) and `clearQuery`.

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { page, item, setQuery, clearQuery } = useSearchParams({
    route: config.home,
  });
}
```

### Updating Queries

You can pass a partial URL Search Params with typesafety or use functional updates

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { page, item, setQuery, clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <div>
      <div>
        <input
          value={page}
          type="number"
          onChange={(e) =>
            setQuery({
              page: parseInt(e.currentTarget.value),
            })
          }
        />
      </div>
      <button
        onClick={() =>
          setQuery(({ page }) => ({
            page: page + 1,
          }))
        }
      >
        Add +1 Page
      </button>
    </div>
  );
}
```

### Clear Queries

```tsx
"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { page, item, setQuery, clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <div>
      <button onClick={() => clearQuery()}>Clear Search Params</button>
    </div>
  );
}
```
