"use client";

import * as React from "react";
import { useSearchParams } from "@search-params/react";
import { config } from "./config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { highlight } from "sugar-high";

export default function Home() {
  const { page, item, notifications, categories, setQuery, clearQuery } =
    useSearchParams({
      route: config.home,
    });

  const html = highlight(
    JSON.stringify({ page, item, notifications, categories }, null, 2)
  );

  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Search Params
      </h1>
      <p className="text-lg">
        Read and update URLSearchParams with full type-safety.
      </p>
      <p className="text-lg text-muted-foreground">
        The current search query is:
      </p>
      <pre
        className="border p-6 rounded-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Table>
        <TableCaption>
          Use the inputs below to update the Search Params
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Param</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>typeof</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Page</TableCell>
            <TableCell>{page}</TableCell>
            <TableCell>{typeof page}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>{item || "-"}</TableCell>
            <TableCell>{typeof item}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Notifications</TableCell>
            <TableCell>{JSON.stringify(notifications) || "-"}</TableCell>
            <TableCell>{typeof notifications}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Categories</TableCell>
            <TableCell>{JSON.stringify(categories) || "-"}</TableCell>
            <TableCell>{typeof categories}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Inputs
      </h4>
      <div className="space-y-3">
        <Input
          value={page}
          type="number"
          onChange={(e) =>
            setQuery({
              page: parseInt(e.currentTarget.value),
            })
          }
        />
        <Button
          variant="secondary"
          onClick={() =>
            setQuery(({ page }) => ({
              page: page + 1,
            }))
          }
        >
          Add +1 Page
        </Button>
      </div>
      <div className="space-y-3">
        <Input
          value={item || ""}
          type="text"
          onChange={(e) =>
            setQuery({
              item: e.currentTarget.value,
            })
          }
        />
        <Button
          variant="secondary"
          onClick={() =>
            setQuery({
              item: "Shirt",
            })
          }
        >
          Add Shirt as bar
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={Boolean(notifications)}
          onCheckedChange={() =>
            setQuery({
              notifications: !notifications,
            })
          }
          id="notifications"
        />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Boolean(categories?.includes("electronics"))}
            onCheckedChange={() =>
              setQuery({
                categories: categories?.includes("electronics")
                  ? categories?.filter((c) => c !== "electronics")
                  : (categories ?? []).concat("electronics"),
              })
            }
            id="electronics"
          />
          <label
            htmlFor="electronics"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Electronics
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Boolean(categories?.includes("consoles"))}
            onCheckedChange={() =>
              setQuery({
                categories: categories?.includes("consoles")
                  ? categories?.filter((c) => c !== "consoles")
                  : (categories ?? []).concat("consoles"),
              })
            }
            id="consoles"
          />
          <label
            htmlFor="consoles"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Consoles
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Boolean(categories?.includes("gifts"))}
            onCheckedChange={() =>
              setQuery({
                categories: categories?.includes("gifts")
                  ? categories?.filter((c) => c !== "gifts")
                  : (categories ?? []).concat("gifts"),
              })
            }
            id="gifts"
          />
          <label
            htmlFor="gifts"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Gifts
          </label>
        </div>
      </div>
      <div className="space-x-2">
        <Button variant="destructive" onClick={() => clearQuery()}>
          Clear Search Params
        </Button>
      </div>
    </div>
  );
}
