-- Seed data for Epiko Hub
-- Run this AFTER running schema.sql

-- Insert sample games
INSERT INTO public.games (title, description, image_url, rating, category, tags, stats) VALUES
('Epiko Regal', 'Strategic tower defense with AR integration.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', 4.8, 'Strategy', ARRAY['Strategy', 'AR', 'Mobile'], '{"matches": 1200, "hours": 45, "wins": 120}'),
('Epiko World', 'Open world adventure and building.', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80', 4.5, 'Adventure', ARRAY['Adventure', 'MMO'], '{"matches": 850, "hours": 120, "wins": 45}'),
('Epiko Bricks', 'Classic arcade puzzle action.', 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80', 4.2, 'Arcade', ARRAY['Arcade', 'Puzzle'], '{"matches": 3400, "hours": 12, "wins": 890}'),
('Epiko Smash', 'High-octane brawler arena.', 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80', 4.6, 'Action', ARRAY['Action', 'Fighting'], '{"matches": 200, "hours": 5, "wins": 12}'),
('Epiko Soul Dash', 'Endless runner with RPG elements.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80', 4.3, 'Runner', ARRAY['Runner', 'Mobile'], '{"matches": 15000, "hours": 30, "wins": 0}')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image_url, rating, stock) VALUES
('Epiko Regal Starter Pack', 'Get a head start with 500 Gems, 2 Rare Chests, and an exclusive avatar frame.', 29.99, 'Digital', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80', 4.8, 999),
('Legendary Dragon Skin', 'Equip your Dragon unit with this terrifying magma-infused skin.', 14.99, 'Skins', 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&q=80', 4.9, 500),
('Epiko Hoodie - Black', 'Premium cotton blend hoodie with embroidered Epiko logo.', 59.99, 'Merch', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 4.7, 50),
('Karma Booster (7 Days)', 'Double your Karma earnings for 7 days. Level up faster!', 9.99, 'Digital', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80', 4.5, 999),
('Limited Edition Snapback', 'Adjustable snapback cap featuring the iconic Epiko emblem.', 24.99, 'Merch', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80', 4.6, 100),
('Battle Pass: Season 4', 'Unlock premium rewards, exclusive skins, and more throughout Season 4.', 19.99, 'Digital', 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80', 4.9, 999)
ON CONFLICT DO NOTHING;

-- Insert sample tournaments
INSERT INTO public.tournaments (title, description, prize_pool, entry_fee, max_participants, current_participants, status, start_date) VALUES
('Epiko Regal World Championship', 'Season 4 • Global Finals', 50000.00, 0, 128, 128, 'active', NOW() + INTERVAL '1 hour'),
('Weekly Skirmish #141', 'Sunday • 3:00 PM EST', 500.00, 500, 64, 32, 'upcoming', NOW() + INTERVAL '2 days'),
('Weekly Skirmish #142', 'Sunday • 3:00 PM EST', 500.00, 500, 64, 15, 'upcoming', NOW() + INTERVAL '9 days'),
('Weekly Skirmish #143', 'Sunday • 3:00 PM EST', 500.00, 500, 64, 8, 'upcoming', NOW() + INTERVAL '16 days')
ON CONFLICT DO NOTHING;
