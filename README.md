# PantryPal

PantryPal is a React recipe finder that matches ingredients in your pantry with Spoonacular recipes and nutrition information.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```env
   VITE_SPOONACULAR_API_KEY=your_spoonacular_api_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

The Spoonacular API key is read from the local environment and is not committed to Git.

## Available commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run lint checks
npm run deploy    # Build and publish to GitHub Pages
```

## Deploy to GitHub Pages

1. Create a public GitHub repository and push this project to it.
2. Make sure `.env.local` contains a valid Spoonacular key.
3. Run:

   ```bash
   npm run deploy
   ```

4. In GitHub, open **Settings > Pages** and choose the `gh-pages` branch as the deployment source.

The published URL will be:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

The app uses hash-based routing so its pages work correctly on GitHub Pages.
