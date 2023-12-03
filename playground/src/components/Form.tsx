import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useSearchParams } from "@search-params/react";
import { config } from "@/config";

export const Form: React.FC = () => {
  const { page, item, notifications, categories, setQuery, clearQuery } =
    useSearchParams({
      route: config.home,
    });

  return (
    <div className="space-y-6 py-3">
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
      <div className="flex flex-wrap gap-3">
        <Input
          className="w-full"
          value={page}
          type="number"
          onChange={(e) =>
            setQuery({
              page: parseInt(e.currentTarget.value),
            })
          }
        />
        <Button
          disabled={page === 1}
          variant="secondary"
          onClick={() =>
            setQuery(({ page }) => ({
              page: page - 1,
            }))
          }
        >
          Previous Page
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            setQuery(({ page }) => ({
              page: page + 1,
            }))
          }
        >
          Next Page
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
          <Label htmlFor="electronics">Electronics</Label>
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
          <Label htmlFor="consoles">Consoles</Label>
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
          <Label htmlFor="gifts">Gifts</Label>
        </div>
      </div>
      <div className="space-x-2">
        <Button
          variant="destructive"
          onClick={() => clearQuery({ scroll: true })}
        >
          Clear Search Params
        </Button>
      </div>
    </div>
  );
};
