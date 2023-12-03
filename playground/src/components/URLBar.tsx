import { RotateCcwIcon } from "lucide-react";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useSearchParams } from "@search-params/react";
import { config } from "@/config";

export const URLBar: React.FC = () => {
  const location = useLocation();
  const { clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <section className="sticky top-0 bg-background/70 backdrop-blur z-10 py-4">
      <div
        style={ARC_DEV_MODE_BG}
        className="p-4 w-full whitespace-nowrap overflow-x-scroll text-xs"
      >
        <code>{location.search}</code>
        {location.search !== "?page=1" && (
          <Button
            style={ARC_DEV_MODE_BG}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-[50%] -translate-y-[50%] group"
            onClick={() => clearQuery()}
          >
            <RotateCcwIcon className="h-4 w-4 group-hover:-rotate-45 group-active:rotate-[-360deg] transition-transform" />
          </Button>
        )}
      </div>
    </section>
  );
};

const ARC_DEV_MODE_BG: React.CSSProperties = {
  background:
    "repeating-linear-gradient(45deg, #4247CB, #4247CB 20px, #3E43CA 20px, #3E43CA 40px)",
};
