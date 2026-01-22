# GitHub Actions Deployment Workflow

## Overview
The application is configured with an automated deployment workflow using GitHub Actions to deploy to GitHub Pages.

## Workflow Details

### Trigger Events
- Push to `main` branch
- Manual trigger via GitHub Actions UI (workflow_dispatch)

### Jobs
1. **Build Job**
   - Checks out the code
   - Sets up Node.js environment (v20)
   - Installs dependencies with npm ci
   - Builds the application using `npm run build`
   - Uploads the built artifacts (from ./dist folder)

2. **Deploy Job**
   - Deploys the built artifacts to GitHub Pages
   - Sets up the deployment environment
   - Makes the site available at the configured URL

### Permissions
- `contents: read` - Read repository contents
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Write ID tokens

### Concurrency Control
- Prevents multiple concurrent deployments
- Cancels in-progress deployments when new ones start

## Deployment Target
The application is deployed to: https://haile12michael12.github.io/Task-Management-Application

## Manual Deployment
To deploy manually without triggering the workflow:
```bash
npm run deploy
```

This command builds the application and deploys it to the configured GitHub Pages branch using the gh-pages package.

## Branch Protection
The workflow is configured to run on pushes to the `main` branch, ensuring that only approved changes are deployed.

## Artifact Storage
Built application files are stored in the `./dist` directory, which is created during the build process and deployed to GitHub Pages.