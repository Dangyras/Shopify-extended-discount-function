
# Shopify Function App – Product Discount Extension

This repository contains a Shopify app that implements a **Product Discount Function** as an [extension-only app](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app). It uses Shopify Functions to apply dynamic, customer-specific discounts to products in the cart based on product metafields and customer metafields.

> 💡 This app template does **not** include a backend server or admin embedding. If you need those features, consider the [Remix app template](https://github.com/Shopify/shopify-app-template-remix).

---

## Overview

This extension applies a discount to cart items based on structured JSON data stored in product metafields. Discounts can be:

- A **single discount** (applied regardless of quantity)
- A **bundle discount** (applied only when a quantity threshold is met)

The discount also requires a logged-in customer with a specific customer metafield (`custom.number`) to be present.

---

## Requirements

Before you begin, ensure the following are set up:

1. [Node.js](https://nodejs.org/en/download/)
2. [Shopify Partner account](https://partners.shopify.com/signup)
3. A [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or [Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store)

---

## Installing the Template

Use your preferred package manager to scaffold a new app with Shopify CLI:

### Using yarn:

```bash
yarn create @shopify/app
```

### Using npm:

```bash
npm init @shopify/app@latest
```

### Using pnpm:

```bash
pnpm create @shopify/app@latest
```

During setup, select **Function - Product Discount** when prompted for extension types.

---

## Local Development

The Shopify CLI runs your app locally and handles all required authentication and linking.

To start local development:

### Using yarn:

```bash
yarn dev
```

### Using npm:

```bash
npm run dev
```

### Using pnpm:

```bash
pnpm run dev
```

Once the app is running, the CLI will provide a preview URL to test the discount in a development store.

---

## Metafield Structure

### Product Metafield (namespace/key: `custom.discount_data`)

```json
[
  {
    "type": "single",
    "discount_message": "15% off for [collection 1] products",
    "discount_amount": 15
  },
  {
    "type": "bundle",
    "discount_message": "25% off for [collection 2] products",
    "discount_amount": 25,
    "qty": 4
  }
]
```

### Customer Metafield (namespace/key: `custom.number`)

```json
"card-12345"
```

Both metafields must be present and correctly formatted for the function to apply discounts.

---

## Developer Resources

- [Shopify Functions](https://shopify.dev/docs/api/functions)
- [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
- [Extension-only apps](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)