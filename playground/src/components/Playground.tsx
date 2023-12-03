import * as React from "react";
import { Navbar } from "./Navbar";
import { URLBar } from "./URLBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Config } from "./Config";
import { Form } from "./Form";

export const Playground: React.FC = () => {
  return (
    <main className="px-4 py-12 max-w-3xl mx-auto">
      <Navbar />
      <URLBar />
      <section className="space-y-4">
        <header>
          <h1 className="text-4xl font-bold tracking-tight">
            The URL Playground
          </h1>
          <p className="text-muted-foreground">
            Read and update URLSearchParams with full type-safety
          </p>
        </header>
        <Tabs className="space-y-4" defaultValue="form">
          <TabsList>
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          <TabsContent value="config">
            <Config />
          </TabsContent>
          <TabsContent value="form">
            <Form />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};
