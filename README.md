# Car Loan Calculator

React + TypeScript + Vite app for estimating monthly car loan payments across different tenures.

## Local development

```bash
npm ci
npm run dev
```

## Production build check

```bash
npm run lint
npm run build
```

## GitHub Pages deployment

This project is configured to deploy with GitHub Actions.

- Vite base path is set in `vite.config.ts` as `/perodua-loan-calculator/`.
- The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it to Pages.
- Commit and push source files only; do not commit local `dist/` output.

### Steps

1. Create a GitHub repository named `perodua-loan-calculator` (or update `vite.config.ts` base to match your repo name).
2. Push this project to the `main` branch.
3. In GitHub, open `Settings -> Pages` and set **Source** to **GitHub Actions**.
4. Push to `main` again (or run the workflow manually from `Actions -> Deploy to GitHub Pages -> Run workflow`).
5. Open `https://<your-username>.github.io/perodua-loan-calculator/` after the workflow passes.

## Troubleshooting

- 404 or broken assets: repository name must match `/perodua-loan-calculator/` in `vite.config.ts`.
- Deployment permissions issue: make sure Pages source is set to GitHub Actions and default branch is `main`.
- Stale content: hard refresh your browser after a successful deployment.
