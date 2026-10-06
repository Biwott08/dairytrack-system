# DairyTrack Pro — Dairy Farm Management System 🐄

A complete, modern, responsive, web-based **Dairy Farm Management System** built with **React.js, Vite, Tailwind CSS, and Supabase PostgreSQL**. Designed for real-world livestock operations, academic project submissions (Diploma/Degree in IT), and professional software portfolios.

---

## 📌 Academic Project Context
This application fully satisfies all practical implementation requirements for an academic project titled:
> **"DESIGN AND DEVELOPMENT OF A DAIRY FARM MANAGEMENT SYSTEM"**

### Software Engineering Concepts Demonstrated:
1. **Requirements Analysis:** Comprehensive operational modules covering livestock lifecycle, milk harvest, breeding cycles, health interventions, and financial accounting.
2. **Normalized Database Design:** 14 relational tables in PostgreSQL with primary keys, foreign key constraints, generated calculated columns, indexes, and Row Level Security (RLS).
3. **Authentication & Security:** Supabase Auth integration, protected routes, and environment variable credentials isolation.
4. **Data Validation & Business Logic:** Automatic expected calving calculation (`Insemination Date + 283 days`), milk yield summation (`Morning + Evening`), financial net profit (`Revenue - Expenses`), and low inventory stock alerts.
5. **Reporting & Analytics:** Exportable PDF and CSV reports with interactive Recharts data visualization.

---

## 🌟 Key Modules & Features

### 1. 🔐 Authentication & Farm Profile
- User registration, login, and forgot password functionality.
- Farm account context (`Green Valley Dairy Farm`) with currency configuration (KES).
- Protected dashboard routes with session guards.

### 2. 📊 Executive Dashboard
- **Summary KPIs:** Total Herd, Lactating Cows, Dry Cows, Today's Milk Harvest, Monthly Revenue, Monthly Expenses, Net Profit (KES).
- **Interactive Recharts:** 7/30-day milk yield trends, Revenue vs Expenses comparison, top producing cows bar chart, herd status donut breakdown.
- **Smart Alert Center:** Automated alerts for upcoming vaccinations, expected calving dates within 30 days, sick cows under treatment, and low inventory levels.

### 3. 🐄 Cattle Management (CRUD & Profiles)
- Complete cattle registry tracking Tag Number, Cow Name, Breed (Friesian, Ayrshire, Jersey, Guernsey, Crossbred), Gender, Age, Weight, Sire, Dam, Purchase Price, and Photo.
- **Detailed Cow Profile Page:**
  - *Basic Info & Lineage*
  - *Milk Harvest History Chart & Logs*
  - *Health Diagnoses & Prescriptions*
  - *Breeding Events & Calving Countdown*
  - *Feed Ration Log*
  - *Individual Cattle P&L Statement*

### 4. 🥛 Daily Milk Production Management
- Morning and Evening milk harvest logging per cow with auto-calculated total (`Total = Morning + Evening`).
- Milk quality grading (Grade A, Grade B, Rejected).
- Production analytics identifying highest and lowest yielding cows.

### 5. 🧬 Breeding & Gestation Management
- Log heat detection, artificial insemination (AI) straws, bull sire info, and pregnancy verification.
- **Auto-Calculated Calving Dates:** Automatically projects calving date based on 283-day bovine gestation.
- Gestation countdown alerts.

### 6. 🩺 Animal Health & Vaccination Management
- Log clinical diagnoses, symptoms, treatments, medications, dosages, vet names, and costs.
- Automatically flags animals under treatment as `Sick` to prevent milk contamination.
- Vaccination schedule tracking (FMD, LSD, Anthrax, ECF) with upcoming booster due alerts.

### 7. 🌾 Herd Feeding & Nutrition Management
- Track Napier grass, Hay, Silage, Dairy meal 24%, Maize germ, and Mineral salts.
- Calculates daily and monthly feed spend, feed cost per cow, and Total Mixed Ration (TMR) balance.

### 8. 💰 Expense Management
- Categorized expense tracking (Feed, Veterinary, Medication, Labour, Transport, Equipment, Utilities, Breeding, Other).
- Payment method records (M-Pesa, Bank Transfer, Cash, Cheque).
- Automatic integration into Net Profit calculations.

### 9. 📈 Milk Sales & Commercial Revenue
- Commercial milk sales logging per customer.
- **Auto-Calculation:** `Total Revenue = Litres Sold × Price per Litre (KES)`.
- Payment status tracking (Paid, Pending, Partial) with unpaid invoice alerts.

### 10. 👥 Customer Management
- Customer directory (Cooperatives like New KCC, Hotels, Boarding Schools, Shops, Individuals).
- Sales history and volume purchased per customer.

### 11. 📦 Farm Inventory & Supplier Management
- Track veterinary drugs, feed bags, milking buckets, and cleaning supplies.
- **Low Stock Threshold Alerts:** Flags items falling below minimum safety levels.
- Vendor directory with contact details and products supplied.

### 12. 📄 Reports & PDF/CSV Export
- One-click PDF report generation using `jsPDF` and `jspdf-autotable`.
- CSV dataset exports for spreadsheet analysis.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js 18 + Vite |
| **Styling & UI** | Tailwind CSS v3 |
| **Icons** | Lucide React |
| **Charts & Analytics** | Recharts |
| **PDF / CSV Export** | jsPDF + jsPDF-AutoTable |
| **Database & Auth** | Supabase (PostgreSQL) + LocalStorage Fallback |
| **Deployment Target** | Vercel / Netlify |

---

## 🗄️ Database Architecture (`supabase_schema.sql`)

The repository includes a complete, normalized PostgreSQL schema script (`supabase_schema.sql`):

```
+-------------------+       +-------------------+       +-----------------------+
|      farms        | 1---N |       cows        | 1---N |   milk_production     |
+-------------------+       +-------------------+       +-----------------------+
| id (PK)           |       | id (PK)           |       | id (PK)               |
| user_id (FK)      |       | farm_id (FK)      |       | cow_id (FK)           |
| name              |       | tag_number        |       | morning_qty           |
| owner_name        |       | name              |       | evening_qty           |
| currency ('KES')  |       | breed, status     |       | total_qty (GENERATED) |
+-------------------+       +-------------------+       +-----------------------+
          |                           |
          | 1---N                     | 1---N
          v                           v
+-------------------+       +-----------------------+
|     expenses      |       |   health_records      |
+-------------------+       +-----------------------+
| id (PK)           |       | id (PK)               |
| category          |       | cow_id (FK)           |
| amount (KES)      |       | diagnosis, cost       |
+-------------------+       +-----------------------+
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/dairy-farm-management.git
cd dairy-farm-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
*(Note: If Supabase keys are not set, the application automatically falls back to the built-in LocalStorage demo dataset so you can evaluate all features offline immediately!)*

### 4. Database Setup (Supabase)
1. Log in to your [Supabase Console](https://supabase.com).
2. Create a new PostgreSQL project.
3. Navigate to **SQL Editor** -> **New Query**.
4. Paste the entire content of `supabase_schema.sql` and run it.

### 5. Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment Instructions (Vercel)

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. Click **Deploy**.

---

## 👨‍💻 Author & Acknowledgments

- **Developer:** Diploma in IT / Software Engineering Portfolio
- **Demo Farm Context:** Green Valley Dairy Farm (Naivasha, Kenya)
- **Currency:** Kenyan Shillings (KES)
