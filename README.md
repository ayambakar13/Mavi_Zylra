# Zylra — Catalog V1 + IA/UX Refactor

Next.js + TypeScript modular storefront for the Zylra Silk Route atelier.

## Included
- 242 V1 catalog records and 242 local image assets.
- Data-driven product/category/subcategory routes.
- Multi-level Women + Accessories mega navigation.
- Men, Kids and Beauty intentional Coming Soon states.
- Global client-side breadcrumbs on subpages.
- Structured `not-found` fallback instead of home redirects.
- Catalog gallery grouped by editorial season, then category.
- Seasonal hero cards mapped directly to explicit catalog product IDs.
- Responsive Istanbul → Central Asia → Kashmir Silk Road SVG section.
- Fixed cookie banner layout with overflow/z-index protections.

## Run
```bash
npm install
npm run dev
```

## Important catalog rule
V1 does not provide prices, inventory, material/color data, or authoritative seasonal assignments. The implementation does not invent those commerce fields. The four seasonal gallery groupings and hero preview IDs are explicit editorial mappings kept in `content/taxonomy.ts` and `content/collections.ts` so they can later be replaced by authoritative merchandising data.

## Architecture rule
Keep presentation, content, domain logic, and infrastructure separate. Product data belongs in the catalog layer; visual components consume it.

## Commerce V1

Added `/cart` and `/account` routes, a localStorage-backed cart context, product quick view, optional pricing/inventory overlay, delivery checkout fields, and WhatsApp order-request routing.

### Catalog commerce data

The current catalog workbook contains SKU/category/image metadata but does not contain `Price`, `Sale Price`, `Currency`, or `Quantity`. Those values are therefore not invented. Run `python scripts/sync_catalog_commerce.py` after adding those optional columns to the workbook. The script writes `data/product-commerce.json`, which the catalog consumes by SKU.

### Inventory behavior

- `Quantity > 0`: Add to Bag is enabled.
- `Quantity = 0`: Add to Bag is disabled and displays Out of Stock.
- Quantity missing: Add to Bag is disabled until stock is known.
- Price missing: Add to Bag is disabled until a price is supplied.

### WhatsApp

The temporary checkout number is configured in `domain/commerce/config.ts` as `8899764864`, with India country code `91`. Change that one value later. The browser opens a WhatsApp conversation with a prefilled order payload; true automated replies and payment messages require a WhatsApp Business API backend and are intentionally not faked by the frontend.

UPI support is prepared through `NEXT_PUBLIC_ZYLRA_UPI_ID`. A production QR/payment component should only be enabled once the real UPI ID is configured.

## Commerce V2 — Standard Product, Cart & Guest Checkout Flow

- Fixed-price products expose `Add to Bag`; sale price is used when present.
- Unpriced products expose `Request Pricing`, opening an inquiry form and posting product/customer data to `/api/inquiries`.
- Cart state persists through localStorage and carries a `guest_session_id`.
- Empty cart includes catalog discovery and featured product cards. Because V1 has no authoritative prices, these currently use `Request Pricing` rather than invented `Add to Bag` pricing.
- Populated cart provides quantity controls, removal, subtotal, and `/checkout`.
- Guest checkout captures contact, shipping, billing, payment method, and notes without requiring registration.
- Card/payment credentials are deliberately not collected directly by the Zylra app. A real payment provider must be connected before card payments can be accepted.
- `/api/orders` creates server-side development order records and `/order-confirmation/[id]` provides the post-purchase account-creation prompt.
- Account creation hashes passwords with Node `scrypt` and links matching guest orders by email.
- Development persistence is currently JSON-file based under `data/`. For production, replace `lib/server/store.ts` with a real database adapter; JSON files are not appropriate as a multi-instance production datastore.
