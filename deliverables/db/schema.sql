-- Postgres schema for Venus Bijoux

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "user" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255),
  name varchar(255),
  provider varchar(32) DEFAULT 'email',
  provider_id varchar(255),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE product (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  slug varchar(255) UNIQUE NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category varchar(32) NOT NULL,
  has_pendant boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE product_variant (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES product(id) ON DELETE CASCADE,
  sku varchar(128) UNIQUE NOT NULL,
  material varchar(128),
  weight_gr numeric(8,3),
  stock integer DEFAULT 0
);

CREATE TABLE pendant_option (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES product(id) ON DELETE CASCADE,
  color varchar(32) NOT NULL,
  sku varchar(128),
  price_adjustment numeric(10,2) DEFAULT 0
);

CREATE TABLE product_image (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES product(id) ON DELETE CASCADE,
  url text NOT NULL,
  alt_text varchar(255),
  ordering integer DEFAULT 0
);

CREATE TABLE cart (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES "user"(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE cart_item (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid REFERENCES cart(id) ON DELETE CASCADE,
  product_variant_id uuid REFERENCES product_variant(id),
  pendant_option_id uuid REFERENCES pendant_option(id),
  quantity integer NOT NULL DEFAULT 1
);

CREATE TABLE "order" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES "user"(id),
  total numeric(12,2),
  status varchar(32) DEFAULT 'pending',
  shipping_address jsonb,
  payment_meta jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE order_item (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES "order"(id) ON DELETE CASCADE,
  product_variant_id uuid REFERENCES product_variant(id),
  pendant_option_id uuid REFERENCES pendant_option(id),
  price numeric(10,2),
  quantity integer
);

CREATE TABLE admin_user (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  role varchar(32) DEFAULT 'operator',
  last_login timestamptz
);

CREATE TABLE audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action varchar(255),
  entity varchar(255),
  entity_id uuid,
  data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Indexes for search and performance
CREATE INDEX idx_product_title_trgm ON product USING gin (title gin_trgm_ops);
CREATE INDEX idx_product_slug ON product (slug);
CREATE INDEX idx_variant_sku ON product_variant (sku);
CREATE INDEX idx_order_created_at ON "order" (created_at);
