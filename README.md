# Security System Bundle Builder

A responsive React application for building a customized home security system based on the provided Figma design.

## Live Demo

https://security-system-bundle-builder-nine.vercel.app

## Features

- Four-step accordion bundle builder
- Product variants with separate quantities
- Live review panel synchronized with product cards
- Dynamic totals and savings
- Default bundle configuration
- Save and restore using localStorage
- Responsive desktop and mobile layouts
- Express API with loading, error, and retry states

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Express
- Vercel Serverless Functions

## Run Locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Elchihi/security-system-bundle-builder.git
cd security-system-bundle-builder
npm install
```

Start the API:

```bash
npm run api:dev
```

In another terminal, start the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
npm start
```

The production application will run on:

```text
http://localhost:3001
```

## API Endpoints

```text
GET /api
GET /api/health
GET /api/products
```

## Available Scripts

```bash
npm run dev
npm run api
npm run api:dev
npm run build
npm run lint
npm start
```

## Project Notes

Product and step data are stored in JSON files. Product quantities and active variants are managed from the main application state so the builder and review panel stay synchronized.

Saved configurations are stored in the browser using localStorage. Checkout is included as a prototype confirmation only.

## Author

Adham Elchihi