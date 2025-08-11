-- ==============================
-- Table: menu_booth
-- ==============================

CREATE TABLE IF NOT EXISTS menu_booth (
    id SERIAL PRIMARY KEY,
    booth_name TEXT NOT NULL,
    menu_name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    tags TEXT[],
    category TEXT,
    menu_type TEXT,
    spiciness_level INTEGER DEFAULT 0,
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    estimated_minutes INTEGER DEFAULT 10,
    is_favorite BOOLEAN DEFAULT FALSE,

    -- audit fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT,
    updated_by TEXT
);

-- Indexing for performance
CREATE INDEX idx_menu_booth_booth_name ON menu_booth(booth_name);
CREATE INDEX idx_menu_booth_tags ON menu_booth USING GIN(tags);

-- ==============================
-- View: v_available_menu
-- ==============================

CREATE OR REPLACE VIEW v_available_menu AS
SELECT
    id,
    booth_name,
    menu_name,
    price,
    description,
    tags,
    category,
    menu_type,
    spiciness_level,
    image_url,
    stock,
    estimated_minutes,
    CASE
        WHEN stock > 0 THEN 'Available'
        ELSE 'Sold Out'
    END AS status
FROM menu_booth;

-- ==============================
-- Trigger: update availability
-- ==============================

CREATE OR REPLACE FUNCTION update_availability()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock <= 0 THEN
        NEW.is_available := FALSE;
    ELSE
        NEW.is_available := TRUE;
    END IF;
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_availability
BEFORE INSERT OR UPDATE ON menu_booth
FOR EACH ROW
EXECUTE FUNCTION update_availability();


-- ==============================
-- Table: orders
-- ==============================

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER NOT NULL,
    booth_name TEXT NOT NULL,
    menu_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total_price INTEGER NOT NULL,
    estimated_minutes INTEGER,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'canceled', 'completed')) DEFAULT 'pending',

    -- audit fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT,
    updated_by TEXT,

    -- foreign key
    CONSTRAINT fk_menu FOREIGN KEY(menu_id) REFERENCES menu_booth(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexing
CREATE INDEX idx_orders_menu_id ON orders(menu_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);


-- ==============================
-- Table: order_history
-- ==============================

CREATE TABLE IF NOT EXISTS order_history (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by TEXT,

    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX idx_order_history_order_id ON order_history(order_id);
CREATE INDEX idx_order_history_changed_at ON order_history(changed_at);
