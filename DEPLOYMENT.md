# GitHub Pages Deployment Guide

## Prerequisites

Before deploying to GitHub Pages, you need to configure the following:

### 1. Add GitHub Secrets

Go to your repository settings and add the following secrets:
- Navigate to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

Add these two secrets:
- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Your Supabase anonymous/public key

### 2. Configure GitHub Pages

1. Go to your repository: `https://github.com/Wharf-Street-Studios/Epiko-Hub`
2. Navigate to: `Settings` → `Pages`
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This allows the workflow to deploy directly

### 3. Deploy

Once the above steps are complete, deployment will happen automatically:
- Push to the `main` branch, or
- Manually trigger the workflow from the "Actions" tab

## Deployment Workflow

The deployment process consists of two jobs:

1. **Build Job**:
   - Checks out the code
   - Sets up Node.js 20
   - Installs dependencies
   - Builds the Next.js app with Supabase environment variables
   - Uploads the build artifact

2. **Deploy Job**:
   - Takes the build artifact
   - Deploys to GitHub Pages
   - Provides the deployment URL

## Accessing Your Site

After successful deployment, your site will be available at:
```
https://wharf-street-studios.github.io/Epiko-Hub/
```

## Troubleshooting

### Build Fails with "Cannot read properties of undefined"
- Ensure both Supabase secrets are properly configured in GitHub
- Check that the secret names match exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 404 Error on Deployment
- Verify that GitHub Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Check that the `basePath` in `next.config.ts` matches your repository name: `/Epiko-Hub`

### Assets Not Loading
- The `.nojekyll` file is automatically added to prevent Jekyll processing
- Ensure `assetPrefix` in `next.config.ts` is set to `/Epiko-Hub/`

## Local Testing

To test the production build locally:

```bash
npm run build
npx serve out
```

This will serve the static export on `http://localhost:3000` (or another port if 3000 is busy).
