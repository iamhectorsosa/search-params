import { ExternalLinkIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-end gap-x-4">
      <Link to="/" className="text-2xl leading-none font-bold tracking-tight">
        @search-params/react
      </Link>
      <a
        href="https://github.com/iamhectorsosa/search-params"
        className="flex items-center gap-x-1 hover:text-muted-foreground leading-none"
      >
        GitHub
        <ExternalLinkIcon className="w-4 h-4" />
      </a>
    </nav>
  );
};
