
# Shopify Function App – Product Discount Extension

This repository contains a Shopify app that implements a **Product Discount Function** using an [extension-only app architecture](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app). It uses Shopify Functions to apply dynamic, customer-specific discounts based on product and customer metafields.

> 💡 This project is already configured and includes all necessary files for the discount function. Follow the instructions below to clone and deploy it to a new Shopify development store.

---

## Overview

This extension applies a discount to cart items based on structured JSON data stored in product metafields. Discounts can be:

- A **single discount** (applied regardless of quantity)
- A **bundle discount** (applied only when a quantity threshold is met)

The discount also requires a logged-in customer with a specific customer metafield (`custom.number`) to be present.

---

## Requirements

Before you begin, make sure you have:

1. [Node.js](https://nodejs.org/en/download/)
2. A [Shopify Partner account](https://partners.shopify.com/signup)
3. A [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store)

---

## Getting Started with This Repository

To use this function in a new store:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

Using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Link your Shopify app

```bash
shopify app link
```

Follow the prompts to connect to your app in the Partner Dashboard.

### 4. Deploy the extension

Run the following to push your function extension to Shopify:

```bash
shopify app deploy
```

Then, enable the function in your Shopify admin (under "Discounts > Function discounts").

---

## Metafield Structure

### Product Metafield (`custom.discount_data`)

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

### Customer Metafield (`custom.number`)

```json
"card-12345"
```

Both metafields must be present and correctly formatted for the discount function to activate.

---

## Developer Resources

- [Shopify Functions](https://shopify.dev/docs/api/functions)
- [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)