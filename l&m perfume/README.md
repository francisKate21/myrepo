# L&M Perfumes storefront

A phone-first Next.js App Router starter built with TypeScript and Tailwind CSS.

## Run locally

1. Install Node.js 18.17 or newer.
2. Run `npm install`.
3. Run `npm run dev`, then open `http://localhost:3000`.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin before deployment so Open Graph image URLs are correct.

## Before launch

- Replace product, price, ingredient, product registration/CPN, shipping, and returns placeholders with verified business information.
- Replace the Messenger URL in `app/layout.tsx` with the brand's actual page URL.
- Add real product and maker photos when available. Current perfume artwork is CSS illustration, not product photography.
- Connect checkout and order confirmation to an order service and a payment provider. The current checkout is a UI prototype and does not create orders or accept payment.
- Connect order tracking to a service that securely verifies the order number and matching email or phone.
- Replace the starter legal text with policies reviewed for the business and applicable law.

The design colors and font stacks live in CSS custom properties in `app/globals.css`; Tailwind color utilities reference those same color tokens.
