-- ============================================
-- ALLURE BEAUTY ATELIER DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  category VARCHAR(100) NOT NULL, -- 'skincare', 'fragrance', 'bodycare', etc.
  subcategory VARCHAR(100),
  brand VARCHAR(100),
  sku VARCHAR(100) UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Product attributes
  volume VARCHAR(50), -- e.g., "50ml", "100ml"
  ingredients TEXT[],
  notes TEXT[], -- For fragrances: top/middle/base notes
  skin_type VARCHAR(100), -- 'dry', 'oily', 'combination', 'sensitive', 'all'
  scent_profile VARCHAR(100), -- 'floral', 'woody', 'citrus', 'oriental', etc.
  
  -- Media
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs with metadata
  video_url VARCHAR(500),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- AI Matching (for personality quiz)
  personality_tags TEXT[], -- e.g., ['sophisticated', 'minimalist', 'bold']
  quiz_match_score JSONB DEFAULT '{}'::jsonb, -- Stores scoring logic for quiz results
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_personality_tags ON products USING GIN(personality_tags);

-- ============================================
-- USER PROFILES TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  avatar_url VARCHAR(500),
  
  -- Preferences
  skin_type VARCHAR(100),
  favorite_scents TEXT[],
  
  -- Quiz results (stored for personalization)
  quiz_results JSONB,
  quiz_completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- GIFT BOXES (CURATED BUNDLES)
-- ============================================
CREATE TABLE gift_boxes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Box details
  title VARCHAR(255) DEFAULT 'My Curated Gift Box',
  description TEXT,
  gift_note TEXT, -- Custom digital message
  
  -- Sharing
  share_token VARCHAR(100) UNIQUE NOT NULL, -- For shareable URLs
  is_public BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  
  -- Status
  is_purchased BOOLEAN DEFAULT false,
  purchased_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_gift_boxes_user_id ON gift_boxes(user_id);
CREATE INDEX idx_gift_boxes_share_token ON gift_boxes(share_token);

-- ============================================
-- GIFT BOX ITEMS (Products in each box)
-- ============================================
CREATE TABLE gift_box_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gift_box_id UUID REFERENCES gift_boxes(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  
  -- Position in the box (1-4 slots)
  position INTEGER NOT NULL CHECK (position >= 1 AND position <= 4),
  
  -- Quantity (usually 1 for gift boxes)
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  
  -- Snapshot of product data at time of addition (for historical accuracy)
  product_snapshot JSONB,
  
  -- Timestamps
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(gift_box_id, position) -- Each position can only have one item
);

CREATE INDEX idx_gift_box_items_gift_box_id ON gift_box_items(gift_box_id);
CREATE INDEX idx_gift_box_items_product_id ON gift_box_items(product_id);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  
  -- Order details
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  
  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Stripe
  stripe_payment_intent_id VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  
  -- Shipping address
  shipping_address JSONB,
  billing_address JSONB,
  
  -- Gift box reference (if order is from a gift box)
  gift_box_id UUID REFERENCES gift_boxes(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  
  -- Item details (snapshot at purchase time)
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100),
  product_image VARCHAR(500),
  
  -- Pricing
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================
-- QUIZ RESPONSES (for analytics and personalization)
-- ============================================
CREATE TABLE quiz_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  session_id VARCHAR(255), -- For anonymous users
  
  -- Quiz data
  responses JSONB NOT NULL, -- Full set of question/answer pairs
  result JSONB, -- AI-generated result with product recommendations
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quiz_responses_user_id ON quiz_responses(user_id);
CREATE INDEX idx_quiz_responses_session_id ON quiz_responses(session_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_box_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Gift Boxes: Users can manage their own boxes, public boxes viewable by all
CREATE POLICY "Users can view own gift boxes" ON gift_boxes
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create gift boxes" ON gift_boxes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gift boxes" ON gift_boxes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gift boxes" ON gift_boxes
  FOR DELETE USING (auth.uid() = user_id);

-- Gift Box Items: Users can manage items in their own boxes
CREATE POLICY "Users can view gift box items" ON gift_box_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM gift_boxes
      WHERE gift_boxes.id = gift_box_items.gift_box_id
      AND (gift_boxes.user_id = auth.uid() OR gift_boxes.is_public = true)
    )
  );

CREATE POLICY "Users can insert gift box items" ON gift_box_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM gift_boxes
      WHERE gift_boxes.id = gift_box_items.gift_box_id
      AND gift_boxes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update gift box items" ON gift_box_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM gift_boxes
      WHERE gift_boxes.id = gift_box_items.gift_box_id
      AND gift_boxes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete gift box items" ON gift_box_items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM gift_boxes
      WHERE gift_boxes.id = gift_box_items.gift_box_id
      AND gift_boxes.user_id = auth.uid()
    )
  );

-- Orders: Users can only view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Order Items: Users can view items from their own orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Quiz Responses: Users can view their own responses
CREATE POLICY "Users can view own quiz responses" ON quiz_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert quiz responses" ON quiz_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to relevant tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gift_boxes_updated_at BEFORE UPDATE ON gift_boxes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique share tokens for gift boxes
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.share_token IS NULL OR NEW.share_token = '' THEN
    NEW.share_token := encode(gen_random_bytes(16), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_gift_box_share_token BEFORE INSERT ON gift_boxes
  FOR EACH ROW EXECUTE FUNCTION generate_share_token();

-- ============================================
-- SAMPLE DATA (Optional - for development)
-- ============================================

-- Insert sample products
INSERT INTO products (name, slug, description, short_description, price, category, subcategory, brand, sku, stock_quantity, volume, skin_type, images, personality_tags, is_active, is_featured) VALUES
('Velvet Rose Eau de Parfum', 'velvet-rose-edp', 'An exquisite blend of Bulgarian rose and oud, crafted for the sophisticated soul who embraces timeless elegance.', 'Bulgarian rose meets precious oud.', 185.00, 'fragrance', 'eau-de-parfum', 'Allure', 'ALL-FRG-001', 50, '50ml', 'all', '["https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=800"]', ARRAY['sophisticated', 'elegant', 'bold'], true, true),

('Luminous Hydration Serum', 'luminous-hydration-serum', 'A lightweight, fast-absorbing serum infused with hyaluronic acid and vitamin C to restore radiance and plumpness.', 'Deep hydration meets radiant glow.', 92.00, 'skincare', 'serum', 'Allure', 'ALL-SKN-002', 120, '30ml', 'all', '["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"]', ARRAY['minimal', 'fresh', 'nurturing'], true, true),

('Noir Amber Body Oil', 'noir-amber-body-oil', 'A rich, nourishing body oil blended with amber, sandalwood, and golden jojoba. Transforms skin into silk.', 'Luxurious hydration with amber essence.', 68.00, 'bodycare', 'oil', 'Allure', 'ALL-BDY-003', 85, '100ml', 'all', '["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800"]', ARRAY['warm', 'sensual', 'indulgent'], true, false),

('Ethereal Mist Cleanser', 'ethereal-mist-cleanser', 'A cloud-like foaming cleanser with rose water and chamomile. Gently removes impurities while maintaining moisture balance.', 'Gentle cleansing, zero compromise.', 54.00, 'skincare', 'cleanser', 'Allure', 'ALL-SKN-004', 200, '150ml', 'sensitive', '["https://images.unsplash.com/photo-1556228841-3f1d1b1e0d1f?w=800"]', ARRAY['gentle', 'calming', 'pure'], true, false);

-- Note: Replace image URLs with your actual product images
