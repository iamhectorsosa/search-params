"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { searchConfig } from "./config";

export default function Home() {
  const queryParams = useSearchParams({
    route: searchConfig.home,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p>
          Query is: <code>{JSON.stringify(queryParams)}</code>
        </p>
        <p>Page is: {queryParams.page}</p>
        <p>typeof Page is: {typeof queryParams.page}</p>
        <p>Item is: {queryParams.item}</p>
        <p>typeof Item is: {typeof queryParams.item}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() =>
            queryParams.setQuery({
              page: 120,
            })
          }
          className="btn"
        >
          Update Page
        </button>
        <button
          onClick={() =>
            queryParams.setQuery({
              item: "Shirt",
            })
          }
          className="btn"
        >
          Add bar
        </button>
        <button onClick={() => queryParams.clearQuery()} className="btn">
          Clear
        </button>
      </div>
    </div>
  );
}
