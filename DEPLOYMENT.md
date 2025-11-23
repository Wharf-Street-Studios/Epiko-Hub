# Epiko Hub Deployment Guide

This guide explains how to deploy the Epiko Hub application to GitHub Pages.

## Overview

The application is a Next.js app configured for static export. It uses **mock data** for all functionality, so no backend configuration is required.

## Deployment Steps

### 1. Configure GitHub Pages

1. Go to your repository settings on GitHub.
2. Navigate to **Pages** (in the left sidebar).
3. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**.
   - (Do not select "Deploy from a branch")

### 2. Trigger Deployment

The deployment is automated via GitHub Actions. It triggers automatically when you:
- Push changes to the `main` branch
- Manually trigger the workflow from the Actions tab

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository.
2. Click on the latest workflow run ("Deploy to GitHub Pages").
3. Wait for the build and deploy jobs to complete (usually 2-3 minutes).

### 4. Access the Site

Once deployed, your site will be available at:
`https://wharf-street-studios.github.io/Epiko-Hub/`

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000/Epiko-Hub`.

## Troubleshooting

### 404 Not Found
- Ensure the repository name matches the `basePath` in `next.config.ts`.
- Verify that the GitHub Pages source is set to "GitHub Actions".
- Check the Actions tab for any build failures.

### Build Errors
- Run `npm run build` locally to identify any issues before pushing.
- Ensure all TypeScript errors are resolved.
