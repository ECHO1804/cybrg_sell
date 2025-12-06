-- Cyborg Ecommerce Database - Migration 001
-- Complete schema for seller → parts → carts → orders
-- Run: Supabase Dashboard → SQL Editor → RUN

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SELLER (Single admin account)
CREATE TABLE public.seller (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CYBORGS (Customer accounts)
CREATE TABLE public.cyborgs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PARTS (Main products)
CREATE TABLE public.parts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.seller(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ATTACHMENTS (Add-ons for parts)
CREATE TABLE public.attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.seller(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PERKS (Bonuses for parts)
CREATE TABLE public.perks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seller_id UUID REFERENCES public.seller(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PARTS ←→ ATTACHMENTS (Many-to-many)
CREATE TABLE public.part_attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  part_id UUID REFERENCES public.parts(id) ON DELETE CASCADE NOT NULL,
  attachment_id UUID REFERENCES public.attachments(id) ON DELETE CASCADE NOT NULL
);

-- 7. PARTS ←→ PERKS (Many-to-many)
CREATE TABLE public.part_perks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  part_id UUID REFERENCES public.parts(id) ON DELETE CASCADE NOT NULL,
  perk_id UUID REFERENCES public.perks(id) ON DELETE CASCADE NOT NULL
);

-- 8. CART (1 per cyborg)
CREATE TABLE public.cart (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cyborg_id UUID REFERENCES public.cyborgs(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CART_ITEMS (Configured parts in cart)
CREATE TABLE public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cart_id UUID REFERENCES public.cart(id) ON DELETE CASCADE NOT NULL,
  part_id UUID REFERENCES public.parts(id) ON DELETE SET NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- 10. CART_ITEM_ATTACHMENTS
CREATE TABLE public.cart_item_attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cart_item_id UUID REFERENCES public.cart_items(id) ON DELETE CASCADE NOT NULL,
  attachment_id UUID REFERENCES public.attachments(id) ON DELETE CASCADE NOT NULL
);

-- 11. CART_ITEM_PERKS
CREATE TABLE public.cart_item_perks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cart_item_id UUID REFERENCES public.cart_items(id) ON DELETE CASCADE NOT NULL,
  perk_id UUID REFERENCES public.perks(id) ON DELETE CASCADE NOT NULL
);

-- 12. ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cyborg_id UUID REFERENCES public.cyborgs(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES public.seller(id) ON DELETE CASCADE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ORDER_ITEMS
CREATE TABLE public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  part_id UUID REFERENCES public.parts(id) ON DELETE SET NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- 14. ORDER_ITEM_ATTACHMENTS
CREATE TABLE public.order_item_attachments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE CASCADE NOT NULL,
  attachment_id UUID REFERENCES public.attachments(id) ON DELETE CASCADE NOT NULL
);

-- 15. ORDER_ITEM_PERKS
CREATE TABLE public.order_item_perks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_item_id UUID REFERENCES public.order_items(id) ON DELETE CASCADE NOT NULL,
  perk_id UUID REFERENCES public.perks(id) ON DELETE CASCADE NOT NULL
);
