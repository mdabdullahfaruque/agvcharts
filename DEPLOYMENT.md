# Deployment Instructions for GitHub Pages

## Prerequisites
Your GitHub repository is at: `https://github.com/mdabdullahfaruque/agvcharts`

## Setup Steps

### 1. Configure GitHub Pages Settings
1. Go to your repository on GitHub: `https://github.com/mdabdullahfaruque/agvcharts`
2. Click **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: Select **GitHub Actions** (NOT "Deploy from a branch")
4. Save the settings

### 2. Push the Changes
From your local repository, run:
```bash
cd /Users/mdabdullahfaruque/Documents/Projects/agvcharts/agvcharts
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

**Note:** If your default branch is `master` instead of `main`, edit `.github/workflows/deploy.yml` line 5 to say `master`.

### 3. Monitor Deployment
1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually 1-2 minutes)
4. Check for any errors in the workflow logs

### 4. Access Your Site
Once deployed, your site will be available at:
**https://mdabdullahfaruque.github.io/agvcharts**

## What Was Changed

### Files Created/Modified:
1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow that:
   - Runs on every push to main branch
   - Installs dependencies
   - Builds the React app
   - Deploys to GitHub Pages

2. **`package.json`** - Added homepage field:
   ```json
   "homepage": "https://mdabdullahfaruque.github.io/agvcharts"
   ```

## Troubleshooting

### If deployment fails:
1. Check the Actions tab for error messages
2. Ensure your default branch name is correct in the workflow file
3. Verify GitHub Pages is set to "GitHub Actions" (not "Deploy from a branch")

### If the site shows a blank page:
1. Check browser console for errors
2. Verify the homepage URL in package.json matches your GitHub Pages URL
3. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### If you see README instead of the app:
- This means GitHub Pages is still set to "Deploy from a branch"
- Change it to "GitHub Actions" in Settings → Pages

## Future Deployments
Every time you push to the main branch, the site will automatically rebuild and redeploy.

You can also manually trigger deployment:
1. Go to Actions tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button

## Local Testing Before Deployment
```bash
npm run build
npx serve -s build
```
Then open http://localhost:3000 to test the production build locally.
