"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";

export default function Home() {
  const { page, item, setQuery, clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Search Params</h1>
      <div className="space-y-2">
        <p>
          Query is: <code>{JSON.stringify({ page, item })}</code>
        </p>
      </div>
      <div className="space-y-2">
        <p>Page is: {page}</p>
        <p>typeof Page is: {typeof page}</p>
      </div>
      <div className="space-y-2">
        <p>Item is: {item}</p>
        <p>typeof Item is: {typeof item}</p>
      </div>
      <div className="space-y-2">
        <div>
          <input
            className="h-10 w-full rounded px-2 text-black"
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
          className="btn"
        >
          Add +1 Page
        </button>
      </div>
      <div className="space-y-2">
        <div>
          <input
            className="h-10 w-full rounded px-2 text-black"
            value={item || ""}
            type="text"
            onChange={(e) =>
              setQuery({
                item: e.currentTarget.value,
              })
            }
          />
        </div>
        <button
          onClick={() =>
            setQuery({
              item: "Shirt",
            })
          }
          className="btn"
        >
          Add Shirt as bar
        </button>
      </div>
      <div className="space-x-2">
        <button onClick={() => clearQuery()} className="btn">
          Clear Search Params
        </button>
      </div>
    </div>
  );
}
