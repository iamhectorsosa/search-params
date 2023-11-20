# Search Params

Read and update [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) with full type-safety.

## Documentation

Please visit our [Documentation](https://search-params-docs.vercel.app) for more detailed information.

## Development

### Installation

The Search Params repository uses [PNPM Workspaces](https://pnpm.io/workspaces) and [Turborepo](https://github.com/vercel/turborepo). To install dependencies, run `pnpm install` in the project root directory.

### Build `@search-params/react`

```bash
cd packages/react
pnpm build
```

### Development

You can also test/debug our packages with the documentation site locally.

```bash
cd docs
pnpm dev
```

Any change to docs will rew-render instantly.

If you update any package, a rebuild is required. Or you can use the watch mode for both in separate terminals.

```bash
cd packages/react
pnpm dev
```