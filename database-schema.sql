-- GoldBuilders Growth Platform - SQLite schema reference.
-- server.js creates these tables and applies forward-only referral_code migrations.
CREATE TABLE IF NOT EXISTS contact_leads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 full_name TEXT NOT NULL,
 organization TEXT,
 email TEXT NOT NULL,
 phone TEXT,
 industry TEXT,
 timeline TEXT,
 service TEXT,
 enquiry_type TEXT NOT NULL DEFAULT 'General enquiry',
 message TEXT,
 consent INTEGER NOT NULL DEFAULT 0,
 referral_code TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS skeelup_registrations (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 full_name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT,
 location TEXT,
 status TEXT,
 course TEXT,
 goal TEXT,
 experience TEXT,
 consent INTEGER NOT NULL DEFAULT 0,
 referral_code TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS assessment_results (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 token TEXT UNIQUE NOT NULL,
 organization TEXT,
 email TEXT,
 strategy INTEGER NOT NULL,
 people INTEGER NOT NULL,
 revenue INTEGER NOT NULL,
 finance INTEGER NOT NULL,
 technology INTEGER NOT NULL,
 operations INTEGER NOT NULL,
 brand INTEGER NOT NULL,
 score INTEGER NOT NULL,
 tier TEXT NOT NULL,
 recommendations_json TEXT,
 consent INTEGER NOT NULL DEFAULT 0,
 referral_code TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS nexora_leads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 full_name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 package TEXT NOT NULL,
 goals TEXT,
 referral_code TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS luxestreams_club_leads (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 full_name TEXT NOT NULL,
 email TEXT NOT NULL,
 phone TEXT NOT NULL,
 city TEXT,
 member_type TEXT NOT NULL,
 services_json TEXT NOT NULL,
 timeline TEXT NOT NULL,
 details TEXT,
 consent INTEGER NOT NULL DEFAULT 0,
 marketing_consent INTEGER NOT NULL DEFAULT 0,
 referral_code TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS referral_partners (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 code TEXT UNIQUE NOT NULL,
 full_name TEXT NOT NULL,
 email TEXT NOT NULL UNIQUE,
 phone TEXT NOT NULL,
 organisation TEXT,
 brands_json TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending',
 consent INTEGER NOT NULL DEFAULT 0,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS referral_clicks (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 code TEXT NOT NULL,
 destination TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referral_sales (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 partner_code TEXT NOT NULL,
 customer_name TEXT NOT NULL,
 customer_email TEXT,
 business_unit TEXT NOT NULL,
 offer TEXT NOT NULL,
 currency TEXT NOT NULL DEFAULT 'NGN',
 gross_amount REAL NOT NULL,
 eligible_revenue REAL NOT NULL,
 commission_rate REAL,
 commission_due REAL,
 agreement_confirmed INTEGER NOT NULL DEFAULT 0,
 status TEXT NOT NULL DEFAULT 'recorded',
 payment_reference TEXT,
 notes TEXT,
 sale_date TEXT NOT NULL DEFAULT CURRENT_DATE,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT
);
