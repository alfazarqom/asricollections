# Asri Collection — Online Store

Frontend-only React + Vite + TypeScript storefront for mobile-first shopping.

## Features
- Product catalogue, category/search filters, product details, cart and checkout.
- Cart and demo order history persisted in browser `localStorage`.
- Demo payment mode for local UI testing.
- Duitku POP sandbox integration boundary with an explicit server-side invoice requirement; no merchant API key is exposed in the browser and no payment is marked paid from a browser callback.

## Run locally

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run build
npm run lint
```

## Payment safety
This repository intentionally contains no backend, Supabase, serverless function, or secret key. A browser-only app cannot securely sign Duitku Create Invoice requests or verify HTTP payment callbacks. To enable real sandbox payment initiation, add an approved server-side invoice endpoint and callback verifier, then connect the frontend to that endpoint. Do not place `DUITKU_MERCHANT_KEY` or an API key in client code.

## Current scope
Demo checkout is a local simulation only. It does not charge money, reserve stock on a server, or verify a provider transaction. Duitku POP mode explains the integration prerequisite until a trusted invoice reference is supplied by a server-side implementation.