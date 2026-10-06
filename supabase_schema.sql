-- =================================================================
-- DAIRY FARM MANAGEMENT SYSTEM - COMPLETE SUPABASE POSTGRESQL SCHEMA & SEED DATA
-- Green Valley Dairy Farm Setup & Production-Ready Normalized Architecture
-- =================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. FARMS TABLE (Farm profile per account)
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    currency VARCHAR(10) DEFAULT 'KES',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. COWS TABLE
CREATE TABLE IF NOT EXISTS public.cows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    tag_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(50) NOT NULL, -- Friesian, Ayrshire, Jersey, Guernsey, Crossbred
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Female', 'Male')),
    date_of_birth DATE NOT NULL,
    weight NUMERIC(6, 2), -- in kg
    color VARCHAR(50),
    purchase_date DATE,
    purchase_price NUMERIC(12, 2) DEFAULT 0.00,
    status VARCHAR(20) NOT NULL DEFAULT 'Lactating' CHECK (status IN ('Lactating', 'Dry', 'Pregnant', 'Sick', 'Sold', 'Deceased')),
    lactation_status VARCHAR(20) DEFAULT 'Lactating' CHECK (lactation_status IN ('Lactating', 'Dry', 'Heifer', 'Calf', 'N/A')),
    current_milk_yield NUMERIC(5, 2) DEFAULT 0.00, -- average L/day
    father VARCHAR(100),
    mother VARCHAR(100),
    notes TEXT,
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MILK PRODUCTION TABLE
CREATE TABLE IF NOT EXISTS public.milk_production (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE NOT NULL,
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    morning_qty NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    evening_qty NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    total_qty NUMERIC(5, 2) GENERATED ALWAYS AS (morning_qty + evening_qty) STORED,
    milk_quality VARCHAR(20) DEFAULT 'Grade A' CHECK (milk_quality IN ('Grade A', 'Grade B', 'Rejected')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BREEDING RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.breeding_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE NOT NULL,
    heat_date DATE NOT NULL,
    insemination_date DATE,
    breeding_method VARCHAR(50) DEFAULT 'Artificial Insemination' CHECK (breeding_method IN ('Artificial Insemination', 'Natural Bull')),
    bull_info VARCHAR(150),
    pregnancy_confirmed BOOLEAN DEFAULT FALSE,
    expected_calving_date DATE,
    actual_calving_date DATE,
    status VARCHAR(30) DEFAULT 'Pending Confirmation' CHECK (status IN ('Heat Detected', 'Inseminated', 'Pregnant', 'Calved', 'Failed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. HEALTH RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE NOT NULL,
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    diagnosis VARCHAR(200) NOT NULL,
    symptoms TEXT,
    treatment TEXT,
    medication VARCHAR(200),
    dosage VARCHAR(100),
    veterinarian VARCHAR(150),
    cost NUMERIC(10, 2) DEFAULT 0.00,
    recovery_status VARCHAR(30) DEFAULT 'Under Treatment' CHECK (recovery_status IN ('Under Treatment', 'Recovered', 'Chronic', 'Fatal')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. VACCINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.vaccinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE NOT NULL,
    vaccine_name VARCHAR(150) NOT NULL,
    administered_date DATE NOT NULL DEFAULT CURRENT_DATE,
    next_due_date DATE NOT NULL,
    cost NUMERIC(10, 2) DEFAULT 0.00,
    veterinarian VARCHAR(150),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. FEED RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.feed_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    cow_id UUID REFERENCES public.cows(id) ON DELETE SET NULL,
    feed_type VARCHAR(100) NOT NULL,
    quantity NUMERIC(8, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg',
    cost NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    group_target VARCHAR(100) DEFAULT 'All Herd',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    record_date DATE NOT NULL DEFAULT CURRENT_DATE,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Feed', 'Veterinary', 'Medication', 'Labour', 'Transport', 'Equipment', 'Utilities', 'Breeding', 'Other')),
    description TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'M-Pesa' CHECK (payment_method IN ('M-Pesa', 'Bank Transfer', 'Cash', 'Cheque')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    location VARCHAR(200),
    customer_type VARCHAR(50) NOT NULL DEFAULT 'Individual' CHECK (customer_type IN ('Individual', 'Hotel', 'School', 'Shop', 'Cooperative', 'Other')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. MILK SALES TABLE
CREATE TABLE IF NOT EXISTS public.milk_sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
    quantity_litres NUMERIC(8, 2) NOT NULL,
    price_per_litre NUMERIC(8, 2) NOT NULL,
    total_amount NUMERIC(12, 2) GENERATED ALWAYS AS (quantity_litres * price_per_litre) STORED,
    payment_status VARCHAR(20) DEFAULT 'Paid' CHECK (payment_status IN ('Paid', 'Pending', 'Partial')),
    payment_method VARCHAR(50) DEFAULT 'M-Pesa' CHECK (payment_method IN ('M-Pesa', 'Bank Transfer', 'Cash', 'Credit')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. SUPPLIERS TABLE
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    location VARCHAR(200),
    products_supplied TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    item_name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Veterinary Drugs', 'Feed', 'Milking Equipment', 'Cleaning Supplies', 'Farm Tools', 'Other')),
    quantity NUMERIC(8, 2) NOT NULL DEFAULT 0,
    unit VARCHAR(30) NOT NULL DEFAULT 'pcs',
    purchase_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    purchase_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE,
    min_stock_level NUMERIC(8, 2) NOT NULL DEFAULT 5,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('vaccination', 'calving', 'breeding', 'inventory', 'payment', 'health', 'production')),
    is_read BOOLEAN DEFAULT FALSE,
    link_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- =================================================================
CREATE INDEX IF NOT EXISTS idx_cows_farm ON public.cows(farm_id);
CREATE INDEX IF NOT EXISTS idx_cows_tag ON public.cows(tag_number);
CREATE INDEX IF NOT EXISTS idx_milk_farm_date ON public.milk_production(farm_id, record_date);
CREATE INDEX IF NOT EXISTS idx_expenses_farm_date ON public.expenses(farm_id, record_date);
CREATE INDEX IF NOT EXISTS idx_sales_farm_date ON public.milk_sales(farm_id, sale_date);

-- =================================================================
-- SUPABASE AUTH AUTOMATIC FARM CREATION TRIGGER
-- =================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.farms (user_id, name, owner_name, email, phone, location, currency)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'farm_name', 'Green Valley Dairy Farm'),
        COALESCE(NEW.raw_user_meta_data->>'owner_name', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email,
        '+254 712 345 678',
        'Naivasha, Nakuru County, Kenya',
        'KES'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milk_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breeding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milk_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Permissive policies for authenticated users or public demo testing
CREATE POLICY "Allow authenticated users to select farms" ON public.farms FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert farms" ON public.farms FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update farms" ON public.farms FOR UPDATE USING (true);

CREATE POLICY "Allow full access on cows" ON public.cows FOR ALL USING (true);
CREATE POLICY "Allow full access on milk_production" ON public.milk_production FOR ALL USING (true);
CREATE POLICY "Allow full access on breeding_records" ON public.breeding_records FOR ALL USING (true);
CREATE POLICY "Allow full access on health_records" ON public.health_records FOR ALL USING (true);
CREATE POLICY "Allow full access on vaccinations" ON public.vaccinations FOR ALL USING (true);
CREATE POLICY "Allow full access on feed_records" ON public.feed_records FOR ALL USING (true);
CREATE POLICY "Allow full access on expenses" ON public.expenses FOR ALL USING (true);
CREATE POLICY "Allow full access on customers" ON public.customers FOR ALL USING (true);
CREATE POLICY "Allow full access on milk_sales" ON public.milk_sales FOR ALL USING (true);
CREATE POLICY "Allow full access on suppliers" ON public.suppliers FOR ALL USING (true);
CREATE POLICY "Allow full access on inventory" ON public.inventory FOR ALL USING (true);
CREATE POLICY "Allow full access on notifications" ON public.notifications FOR ALL USING (true);

-- =================================================================
-- SAMPLE DEMO DATA INSERTION (GREEN VALLEY DAIRY FARM - KES)
-- =================================================================
INSERT INTO public.farms (id, name, owner_name, email, phone, location, currency)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'Green Valley Dairy Farm',
    'Samuel Kamau',
    'samuel@greenvalleydairy.co.ke',
    '+254 712 345 678',
    'Naivasha, Nakuru County, Kenya',
    'KES'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.cows (id, farm_id, tag_number, name, breed, gender, date_of_birth, weight, color, purchase_date, purchase_price, status, lactation_status, current_milk_yield, father, mother, notes, photo_url)
VALUES 
('22222222-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111111', 'KEF-101', 'Daisy', 'Friesian', 'Female', '2020-03-15', 580, 'Black & White', '2021-04-10', 150000, 'Lactating', 'Lactating', 28.5, 'BullsEye Supreme', 'Bella', 'High yield top producer.', 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'),
('22222222-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111112', 'KEF-102', 'Blossom', 'Ayrshire', 'Female', '2019-11-20', 520, 'Red & White', '2021-02-15', 135000, 'Lactating', 'Lactating', 24.0, 'Red King AI', 'Ruby', 'Consistent milk fat percentage 4.2%.', 'https://images.unsplash.com/photo-1570042707220-438d15444b0d?auto=format&fit=crop&w=500&q=80'),
('22222222-1111-1111-1111-111111111103', '11111111-1111-1111-1111-111111111111', 'KEF-103', 'Buttercup', 'Jersey', 'Female', '2021-01-08', 430, 'Light Brown', '2022-03-01', 140000, 'Pregnant', 'Lactating', 19.5, 'Golden Boy Jersey', 'Honey', 'High butterfat yield 5.1%.', 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80')
ON CONFLICT (tag_number) DO NOTHING;

INSERT INTO public.customers (id, farm_id, name, phone, email, location, customer_type, notes)
VALUES
('33333333-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111111', 'New KCC Naivasha Depot', '+254 722 111 222', 'naivasha@newkcc.co.ke', 'Naivasha Town', 'Cooperative', 'Bulk morning milk delivery contract'),
('33333333-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111111', 'Naivasha Country Club Hotel', '+254 733 444 555', 'procurement@countryclub.co.ke', 'Moi South Lake Road', 'Hotel', 'Premium grade A milk daily')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.expenses (id, farm_id, record_date, category, description, amount, payment_method)
VALUES
('44444444-1111-1111-1111-111111111101', '11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '1 day', 'Feed', 'Purchase of 20 bags High-Yield Dairy Meal 50kg', 54000, 'M-Pesa'),
('44444444-1111-1111-1111-111111111102', '11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '3 days', 'Veterinary', 'Vet visit fee & mastitis medication for KEF-106', 4500, 'M-Pesa')
ON CONFLICT (id) DO NOTHING;
