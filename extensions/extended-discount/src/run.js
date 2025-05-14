// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const customer = input.cart.buyerIdentity?.customer;
  if (!customer) {
    console.error("Customer is not logged in.");
    return EMPTY_DISCOUNT;
  }

  const numberMetafield = customer?.metafield?.value;
  if (!numberMetafield || numberMetafield.trim() === "") {
    console.error("Customer does not have required metafield `custom.number`.");
    // return EMPTY_DISCOUNT;
  }

  const discounts = [];

  for (const line of input.cart.lines) {
    if (!("product" in (line.merchandise || {}))) continue;

    /** @type {ProductVariant} */
    const variant = /** @type {ProductVariant} */ (line.merchandise);

    const metafieldValue = variant.product?.metafield?.value;
    if (!metafieldValue) continue;

    let discountEntries;
    try {
      discountEntries = JSON.parse(metafieldValue);
    } catch (e) {
      console.error(`Invalid JSON in product metafield: ${metafieldValue}`);
      continue;
    }

    
    console.log(discountEntries);

    if (!Array.isArray(discountEntries)) continue;

    const lineQty = line.quantity;
    let bestDiscount = null;

    for (const entry of discountEntries) {
      const type = entry.type;
      const amount = Number(entry.discount_amount);
      const message = entry.discount_message;

      if (!amount || isNaN(amount)) continue;

      if (type === "single") {
        // Always apply single discount
        if (!bestDiscount || amount > bestDiscount.amount) {
          bestDiscount = { amount, message };
        }
      }

      if (type === "bundle" && lineQty >= entry.qty) {
        // Only apply if quantity requirement is met
        if (!bestDiscount || amount > bestDiscount.amount) {
          bestDiscount = { amount, message };
        }
      }
    }

    if (bestDiscount) {
      discounts.push({
        message: bestDiscount.message,
        targets: [
          /** @type {Target} */ ({
            cartLine: {
              id: line.id,
            },
          }),
        ],
        value: {
          percentage: {
            value: bestDiscount.amount.toString(),
          },
        },
      });
    }
  }

  if (!discounts.length) {
    console.error("No cart lines qualify for discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.All,
  };
}
