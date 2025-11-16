# API Endpoints — Venux Bijoux (REST)

Below are the main endpoints grouped by function with example request/response shapes.

## Auth

- POST /api/auth/register

  - body: { name, email, password }
  - response 201: { user:{id,name,email}, accessToken, refreshToken }

- POST /api/auth/login

  - body: { email, password }
  - response 200: { user, accessToken, refreshToken }

- POST /api/auth/refresh

  - body: { refreshToken }
  - response: { accessToken, refreshToken }

- POST /api/auth/logout
  - invalidate refresh token/cookie

## Products

- GET /api/products?q=&page=&limit=&filters=

  - response: { items:[{id,slug,name,price,thumbnail,variants}], meta }

- GET /api/products/:slug

  - response: { id,slug,name,description,price,variants,images }

- POST /api/admin/products (admin)
- PUT /api/admin/products/:id
- DELETE /api/admin/products/:id

## Pendants

- GET /api/pendants
- GET /api/pendants/:id

## Cart

- GET /api/cart
- POST /api/cart/items { productVariantId, quantity, configJson }
- PUT /api/cart/items/:id { quantity }
- DELETE /api/cart/items/:id

## Checkout / Orders

- POST /api/checkout/create { cartId, shipping, paymentMethod }

  - response: { orderId, paymentUrl }

- GET /api/orders (user)
- GET /api/orders/:id

- POST /api/webhooks/payment (provider webhook)

## Admin / Reports

- GET /api/admin/reports/stock-alerts
- GET /api/admin/orders?status=

Example product list item:

```json
{
  "id": "uuid",
  "slug": "colar-artesanal-1",
  "name": "Colar Artesanal 1",
  "price": 129.0,
  "thumbnail": "https://cdn.example.com/p/1-thumb.webp",
  "variants": [{ "id": "v1", "material": "prata", "stock": 10 }]
}
```

Security notes:

- Protect admin endpoints with role-based auth middleware.
- Validate all inputs on server-side and sanitize outputs.
