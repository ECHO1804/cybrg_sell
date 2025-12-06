-- Cyborg Ecommerce - Seed Data (Run AFTER 001_full_schema.sql)

-- 1. Admin seller account
INSERT INTO public.seller (email, password, name) VALUES 
('admin@cyborgstore.com', 'adminpass123', 'Cyborg Store Admin');

-- 2. Test cyborg customer
INSERT INTO public.cyborgs (email, password, name) VALUES 
('cyborg1@test.com', 'cyborgpass123', 'Test Cyborg #001');

-- 3. Sample PARTS
INSERT INTO public.parts (seller_id, name, category, price, description) VALUES 
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Laser Eye', 'eye', 299.99, 'High-powered laser vision'),
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Rocket Arm', 'arm', 499.99, 'Rocket-propelled punching arm'),
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Steel Leg', 'leg', 399.99, 'Indestructible titanium legs');

-- 4. Sample ATTACHMENTS
INSERT INTO public.attachments (seller_id, name, price, description) VALUES 
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Plasma Cannon', 199.99, 'Arm-mounted plasma weapon'),
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Targeting HUD', 99.99, 'Eye attachment for precision targeting');

-- 5. Sample PERKS
INSERT INTO public.perks (seller_id, name, price, description) VALUES 
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Speed Boost', 149.99, '+50% movement speed'),
((SELECT id FROM public.seller WHERE email='admin@cyborgstore.com'), 'Durability +', 79.99, 'Double armor rating');

-- 6. COMPATIBILITY (Laser Eye works with Targeting HUD + Speed Boost)
INSERT INTO public.part_attachments (part_id, attachment_id) VALUES 
((SELECT id FROM public.parts WHERE name='Laser Eye' LIMIT 1), (SELECT id FROM public.attachments WHERE name='Targeting HUD' LIMIT 1));
INSERT INTO public.part_perks (part_id, perk_id) VALUES 
((SELECT id FROM public.parts WHERE name='Laser Eye' LIMIT 1), (SELECT id FROM public.perks WHERE name='Speed Boost' LIMIT 1));

-- 7. Test CART + configured Laser Eye cart item
INSERT INTO public.cart (cyborg_id) VALUES 
((SELECT id FROM public.cyborgs WHERE email='cyborg1@test.com'));

INSERT INTO public.cart_items (cart_id, part_id, total_price) VALUES 
((SELECT id FROM public.cart WHERE cyborg_id=(SELECT id FROM public.cyborgs WHERE email='cyborg1@test.com')), 
 (SELECT id FROM public.parts WHERE name='Laser Eye' LIMIT 1), 299.99);

-- 8. Add HUD + Speed Boost to that cart item
INSERT INTO public.cart_item_attachments (cart_item_id, attachment_id) VALUES 
((SELECT id FROM public.cart_items WHERE part_id IN (SELECT id FROM public.parts WHERE name='Laser Eye') LIMIT 1),
 (SELECT id FROM public.attachments WHERE name='Targeting HUD' LIMIT 1));

INSERT INTO public.cart_item_perks (cart_item_id, perk_id) VALUES 
((SELECT id FROM public.cart_items WHERE part_id IN (SELECT id FROM public.parts WHERE name='Laser Eye') LIMIT 1),
 (SELECT id FROM public.perks WHERE name='Speed Boost' LIMIT 1));
