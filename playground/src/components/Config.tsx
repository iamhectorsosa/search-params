import * as React from "react";
import { highlight } from "sugar-high";
import rawConfig from "../config.ts?raw";

export const Config: React.FC = () => {
  return (
    <div className="space-y-4">
      <p className="leading-7">
        Use{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          createSearchParamsConfig
        </code>{" "}
        to create a config object to handle all validations. You can choose any
        schema validation library (i.e. Valibot, Zod, Yup, etc..), or write your
        own, to handle your validations.
      </p>
      <pre
        className="border p-6 rounded-lg overflow-x-scroll text-sm"
        dangerouslySetInnerHTML={{
          __html: highlight(rawConfig),
        }}
      />
    </div>
  );
};
