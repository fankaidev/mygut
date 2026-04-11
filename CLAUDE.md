# Project Guidelines

## Package Manager

Always use `pnpm` instead of `npm` or `yarn`.

## Git Workflow

Always create a pull request for changes. Never push directly to main.

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:

- `feat(gateway): add retry logic for API calls`
- `fix(ui): correct cursor position in file browser`
- `docs: update README with badges`
- `test: fix flaky navigation test`

After creating a PR, monitor its CI status. If CI fails, investigate and fix promptly.

## E2E Testing

E2E tests require WeChat DevTools and cannot run in CI. After creating or updating a PR, run E2E tests locally:

```bash
pnpm test:e2e
```

Prerequisites:
- WeChat DevTools installed with Service Port enabled (Settings > Security)
- `.env.local` configured with valid appID and cloud environment
