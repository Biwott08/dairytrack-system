// Initial Realistic Demo Data for Green Valley Dairy Farm (Kenyan Context in KES)

export const INITIAL_FARM = {
  id: 'farm-001',
  name: 'Green Valley Dairy Farm',
  ownerName: 'Samuel Kamau',
  email: 'samuel@greenvalleydairy.co.ke',
  phone: '+254 712 345 678',
  location: 'Naivasha, Nakuru County, Kenya',
  currency: 'KES',
  totalArea: '25 Acres',
  establishedYear: '2018'
};

export const INITIAL_USER = {
  id: 'usr-001',
  name: 'Samuel Kamau',
  email: 'samuel@greenvalleydairy.co.ke',
  role: 'Farm Owner',
  farmName: 'Green Valley Dairy Farm'
};

export const INITIAL_COWS = [
  {
    id: 'cow-101',
    tag_number: 'KEF-101',
    name: 'Daisy',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '2020-03-15',
    weight: 580,
    color: 'Black & White',
    purchase_date: '2021-04-10',
    purchase_price: 150000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 28.5,
    father: 'BullsEye Supreme',
    mother: 'Bella',
    notes: 'High yield top producer. Responds well to dairy meal supplementation.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-102',
    tag_number: 'KEF-102',
    name: 'Blossom',
    breed: 'Ayrshire',
    gender: 'Female',
    date_of_birth: '2019-11-20',
    weight: 520,
    color: 'Red & White',
    purchase_date: '2021-02-15',
    purchase_price: 135000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 24.0,
    father: 'Red King AI',
    mother: 'Ruby',
    notes: 'Consistent milk fat percentage (4.2%). Very docile temperament.',
    photo_url: 'https://images.unsplash.com/photo-1570042707220-438d15444b0d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-103',
    tag_number: 'KEF-103',
    name: 'Buttercup',
    breed: 'Jersey',
    gender: 'Female',
    date_of_birth: '2021-01-08',
    weight: 430,
    color: 'Light Brown / Fawn',
    purchase_date: '2022-03-01',
    purchase_price: 140000,
    status: 'Pregnant',
    lactation_status: 'Lactating',
    current_milk_yield: 19.5,
    father: 'Golden Boy Jersey',
    mother: 'Honey',
    notes: 'High butterfat yield (5.1%). Pregnant with expected calving in Nov 2026.',
    photo_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-104',
    tag_number: 'KEF-104',
    name: 'Clarababelle',
    breed: 'Guernsey',
    gender: 'Female',
    date_of_birth: '2020-08-12',
    weight: 490,
    color: 'Fawn & White',
    purchase_date: '2021-10-05',
    purchase_price: 125000,
    status: 'Dry',
    lactation_status: 'Dry',
    current_milk_yield: 0.0,
    father: 'Golden Champion',
    mother: 'Chloe',
    notes: 'Currently in dry period before expected calving next month.',
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-105',
    tag_number: 'KEF-105',
    name: 'Rosie',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '2022-05-30',
    weight: 540,
    color: 'Black & White',
    purchase_date: '2023-01-15',
    purchase_price: 160000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 26.0,
    father: 'Dutch Star AI',
    mother: 'Daisy',
    notes: 'Daughter of Daisy (KEF-101). Excellent udder structure.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-106',
    tag_number: 'KEF-106',
    name: 'Stella',
    breed: 'Ayrshire',
    gender: 'Female',
    date_of_birth: '2021-09-14',
    weight: 510,
    color: 'Dark Red & White',
    purchase_date: '2022-11-20',
    purchase_price: 130000,
    status: 'Sick',
    lactation_status: 'Lactating',
    current_milk_yield: 12.0,
    father: 'Highland Prince',
    mother: 'Star',
    notes: 'Currently under vet treatment for mild mastitis in rear right quarter.',
    photo_url: 'https://images.unsplash.com/photo-1570042707220-438d15444b0d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-107',
    tag_number: 'KEF-107',
    name: 'Molly',
    breed: 'Crossbred',
    gender: 'Female',
    date_of_birth: '2020-04-18',
    weight: 530,
    color: 'Brindle / Brown',
    purchase_date: '2021-07-22',
    purchase_price: 110000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 21.0,
    father: 'Local Sahiwal Bull',
    mother: 'Friesian Cross',
    notes: 'Hardy breed cross. Low susceptibility to tick-borne diseases.',
    photo_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-108',
    tag_number: 'KEF-108',
    name: 'Penelope',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '2023-02-10',
    weight: 460,
    color: 'Mostly Black',
    purchase_date: '2023-10-01',
    purchase_price: 145000,
    status: 'Pregnant',
    lactation_status: 'Lactating',
    current_milk_yield: 22.5,
    father: 'Semex WorldClass',
    mother: 'Penny',
    notes: 'First lactation heifer. Confirmed pregnant 3 months ago.',
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-109',
    tag_number: 'KEF-109',
    name: 'Grace',
    breed: 'Jersey',
    gender: 'Female',
    date_of_birth: '2022-10-05',
    weight: 410,
    color: 'Dark Tan',
    purchase_date: '2023-11-12',
    purchase_price: 135000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 18.0,
    father: 'Danish Jersey AI',
    mother: 'Buttercup',
    notes: 'Very energetic and healthy. High protein yield in milk.',
    photo_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-110',
    tag_number: 'KEF-110',
    name: 'Luna',
    breed: 'Ayrshire',
    gender: 'Female',
    date_of_birth: '2018-06-25',
    weight: 560,
    color: 'Mahogany & White',
    purchase_date: '2020-01-10',
    purchase_price: 140000,
    status: 'Dry',
    lactation_status: 'Dry',
    current_milk_yield: 0.0,
    father: 'Supreme Ayrshire',
    mother: 'Lucy',
    notes: 'Mature dam. Resting in paddocks before 4th lactation cycle.',
    photo_url: 'https://images.unsplash.com/photo-1570042707220-438d15444b0d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-111',
    tag_number: 'KEF-111',
    name: 'Maya',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '2024-01-15',
    weight: 220,
    color: 'Black & White',
    purchase_date: '2024-01-15',
    purchase_price: 0,
    status: 'Lactating',
    lactation_status: 'Heifer',
    current_milk_yield: 0.0,
    father: 'ABS Global Bull',
    mother: 'Daisy',
    notes: 'Born on farm. Currently healthy growing heifer.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-112',
    tag_number: 'KEF-112',
    name: 'Nora',
    breed: 'Guernsey',
    gender: 'Female',
    date_of_birth: '2021-12-01',
    weight: 480,
    color: 'Golden Fawn',
    purchase_date: '2023-04-18',
    purchase_price: 130000,
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: 20.5,
    father: 'Guernsey King',
    mother: 'Nancy',
    notes: 'Good fodder conversion ratio.',
    photo_url: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-113',
    tag_number: 'KEF-113',
    name: 'Ferdinand',
    breed: 'Friesian',
    gender: 'Male',
    date_of_birth: '2023-08-20',
    weight: 620,
    color: 'Solid Black',
    purchase_date: '2024-02-10',
    purchase_price: 180000,
    status: 'Lactating',
    lactation_status: 'N/A',
    current_milk_yield: 0.0,
    father: 'Titanium AI',
    mother: 'Freida',
    notes: 'Breeding bull reserved for natural serving or sale.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-114',
    tag_number: 'KEF-114',
    name: 'Queenie',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '2017-03-10',
    weight: 590,
    color: 'Black & White',
    purchase_date: '2019-05-12',
    purchase_price: 140000,
    status: 'Sold',
    lactation_status: 'N/A',
    current_milk_yield: 0.0,
    father: 'Old Master',
    mother: 'Queen',
    notes: 'Sold to neighboring farm in August 2026 for KES 120,000.',
    photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'cow-115',
    tag_number: 'KEF-115',
    name: 'Zoe',
    breed: 'Ayrshire',
    gender: 'Female',
    date_of_birth: '2019-02-14',
    weight: 510,
    color: 'White & Red',
    purchase_date: '2020-08-01',
    purchase_price: 130000,
    status: 'Deceased',
    lactation_status: 'N/A',
    current_milk_yield: 0.0,
    father: 'Red Warrior',
    mother: 'Zena',
    notes: 'Deceased due to severe bloat complication in June 2026.',
    photo_url: 'https://images.unsplash.com/photo-1570042707220-438d15444b0d?auto=format&fit=crop&w=500&q=80'
  }
];

// Generate 30 days of recent daily milk records
const generateMilkRecords = () => {
  const records = [];
  const cows = ['cow-101', 'cow-102', 'cow-103', 'cow-105', 'cow-106', 'cow-107', 'cow-108', 'cow-109', 'cow-112'];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    cows.forEach((cowId, index) => {
      const baseMorning = 10 + (index * 1.5) + (Math.sin(i + index) * 1.2);
      const baseEvening = 8 + (index * 1.2) + (Math.cos(i + index) * 1.0);
      const morning_qty = Math.max(4, parseFloat(baseMorning.toFixed(1)));
      const evening_qty = Math.max(3, parseFloat(baseEvening.toFixed(1)));
      const total_qty = parseFloat((morning_qty + evening_qty).toFixed(1));

      records.push({
        id: `milk-${dateStr}-${cowId}`,
        cow_id: cowId,
        record_date: dateStr,
        morning_qty,
        evening_qty,
        total_qty,
        milk_quality: morning_qty > 12 ? 'Grade A' : 'Grade B',
        notes: morning_qty > 14 ? 'Peak morning yield recorded.' : 'Normal yield.'
      });
    });
  }
  return records;
};

export const INITIAL_MILK_PRODUCTION = generateMilkRecords();

export const INITIAL_HEALTH_RECORDS = [
  {
    id: 'hlth-001',
    cow_id: 'cow-106',
    record_date: '2026-09-28',
    diagnosis: 'Clinical Mastitis',
    symptoms: 'Swollen rear quarter, clotted milk, mild fever (39.8°C)',
    treatment: 'Intramammary antibiotic infusion & anti-inflammatory injection',
    medication: 'Spectramast LC & Flunixin',
    dosage: '1 syringe intramammary q12h x 3 days',
    veterinarian: 'Dr. John Omondi (DVM)',
    cost: 4500,
    recovery_status: 'Under Treatment',
    notes: 'Withholding milk from tank until treatment ends.'
  },
  {
    id: 'hlth-002',
    cow_id: 'cow-101',
    record_date: '2026-08-14',
    diagnosis: 'Mild Foot Rot',
    symptoms: 'Interdigital swelling, slight lameness on left forelimb',
    treatment: 'Hoof trimming, antibiotic foot bath, injectable Oxytetracycline',
    medication: 'Oxytetracycline 20% LA',
    dosage: '20 ml IM single dose',
    veterinarian: 'Dr. John Omondi (DVM)',
    cost: 3200,
    recovery_status: 'Recovered',
    notes: 'Fully resolved within 5 days.'
  },
  {
    id: 'hlth-003',
    cow_id: 'cow-103',
    record_date: '2026-07-10',
    diagnosis: 'Routine Post-Partum Check',
    symptoms: 'Normal post-calving recovery check',
    treatment: 'Uterine flush and vitamin injection',
    medication: 'Multivitamin + Selenium',
    dosage: '15 ml IM',
    veterinarian: 'Dr. Sarah Mutua',
    cost: 2500,
    recovery_status: 'Recovered',
    notes: 'Uterus in good position, clear discharge.'
  },
  {
    id: 'hlth-004',
    cow_id: 'cow-107',
    record_date: '2026-09-02',
    diagnosis: 'Tick-borne Anaplasmosis',
    symptoms: 'Pale mucous membranes, loss of appetite, fever',
    treatment: 'Imidocarb dipropionate injection & iron tonic',
    medication: 'Imizol & Haematinic syrup',
    dosage: '10 ml SC',
    veterinarian: 'Dr. John Omondi (DVM)',
    cost: 5800,
    recovery_status: 'Recovered',
    notes: 'Appetite restored after 48h.'
  },
  {
    id: 'hlth-005',
    cow_id: 'cow-102',
    record_date: '2026-06-18',
    diagnosis: 'Deworming & Parasite Control',
    symptoms: 'Routine herd deworming schedule',
    treatment: 'Oral drenching',
    medication: 'Albendazole 10%',
    dosage: '60 ml oral',
    veterinarian: 'Dr. Sarah Mutua',
    cost: 1200,
    recovery_status: 'Recovered',
    notes: 'All lactating cows treated.'
  }
];

export const INITIAL_VACCINATIONS = [
  {
    id: 'vac-001',
    cow_id: 'cow-101',
    vaccine_name: 'Foot and Mouth Disease (FMD)',
    administered_date: '2026-05-10',
    next_due_date: '2026-11-10',
    cost: 850,
    veterinarian: 'Dr. John Omondi',
    notes: 'Bi-annual FMD booster'
  },
  {
    id: 'vac-002',
    cow_id: 'cow-102',
    vaccine_name: 'Foot and Mouth Disease (FMD)',
    administered_date: '2026-05-10',
    next_due_date: '2026-11-10',
    cost: 850,
    veterinarian: 'Dr. John Omondi',
    notes: 'Bi-annual FMD booster'
  },
  {
    id: 'vac-003',
    cow_id: 'cow-103',
    vaccine_name: 'Lumpy Skin Disease (LSD)',
    administered_date: '2026-04-15',
    next_due_date: '2026-10-15',
    cost: 650,
    veterinarian: 'Dr. Sarah Mutua',
    notes: 'Annual LSD vaccination due soon'
  },
  {
    id: 'vac-004',
    cow_id: 'cow-105',
    vaccine_name: 'Anthrax & Blackquarter',
    administered_date: '2026-03-01',
    next_due_date: '2027-03-01',
    cost: 950,
    veterinarian: 'Dr. John Omondi',
    notes: 'Blanthrax combined vaccine'
  },
  {
    id: 'vac-005',
    cow_id: 'cow-106',
    vaccine_name: 'East Coast Fever (ECF) Immunization',
    administered_date: '2025-11-20',
    next_due_date: '2026-11-20',
    cost: 3500,
    veterinarian: 'Dr. John Omondi',
    notes: 'Infection and treatment method (ITM)'
  }
];

export const INITIAL_BREEDING_RECORDS = [
  {
    id: 'brd-001',
    cow_id: 'cow-103',
    heat_date: '2026-02-10',
    insemination_date: '2026-02-11',
    breeding_method: 'Artificial Insemination',
    bull_info: 'WorldClass Friesian Straw #Semex-940',
    pregnancy_confirmed: true,
    expected_calving_date: '2026-11-21',
    actual_calving_date: null,
    status: 'Pregnant',
    notes: 'Pregnancy confirmed via ultrasound on day 45.'
  },
  {
    id: 'brd-002',
    cow_id: 'cow-108',
    heat_date: '2026-06-05',
    insemination_date: '2026-06-06',
    breeding_method: 'Artificial Insemination',
    bull_info: 'CRV Ambreed Jersey #CRV-882',
    pregnancy_confirmed: true,
    expected_calving_date: '2027-03-16',
    actual_calving_date: null,
    status: 'Pregnant',
    notes: 'Confirmed by vet during routine palpation.'
  },
  {
    id: 'brd-003',
    cow_id: 'cow-104',
    heat_date: '2025-12-01',
    insemination_date: '2025-12-02',
    breeding_method: 'Artificial Insemination',
    bull_info: 'Guernsey Gold Star #GNY-104',
    pregnancy_confirmed: true,
    expected_calving_date: '2026-09-11',
    actual_calving_date: null,
    status: 'Pregnant',
    notes: 'Cow in dry period now. Calving expected imminently.'
  },
  {
    id: 'brd-004',
    cow_id: 'cow-105',
    heat_date: '2026-09-15',
    insemination_date: '2026-09-16',
    breeding_method: 'Artificial Insemination',
    bull_info: 'Alta Genetics Friesian #ALT-502',
    pregnancy_confirmed: false,
    expected_calving_date: '2027-06-26',
    actual_calving_date: null,
    status: 'Inseminated',
    notes: 'Pending pregnancy test in 45 days.'
  },
  {
    id: 'brd-005',
    cow_id: 'cow-102',
    heat_date: '2026-09-25',
    insemination_date: null,
    breeding_method: 'Artificial Insemination',
    bull_info: 'To be assigned',
    pregnancy_confirmed: false,
    expected_calving_date: null,
    actual_calving_date: null,
    status: 'Heat Detected',
    notes: 'Standing heat observed this morning. AI technician called.'
  }
];

export const INITIAL_FEED_RECORDS = [
  {
    id: 'fd-001',
    cow_id: null,
    feed_type: 'Napier Grass',
    quantity: 450,
    unit: 'kg',
    cost: 4500,
    record_date: '2026-10-04',
    group_target: 'Lactating Herd',
    notes: 'Chopped green fodder fed in troughs.'
  },
  {
    id: 'fd-002',
    cow_id: null,
    feed_type: 'Dairy Meal 24%',
    quantity: 120,
    unit: 'kg',
    cost: 5400,
    record_date: '2026-10-04',
    group_target: 'Lactating Herd',
    notes: 'Commercial concentrate fed during morning and evening milking.'
  },
  {
    id: 'fd-003',
    cow_id: null,
    feed_type: 'Maize Silage',
    quantity: 300,
    unit: 'kg',
    cost: 3600,
    record_date: '2026-10-03',
    group_target: 'All Herd',
    notes: 'High energy pit silage.'
  },
  {
    id: 'fd-004',
    cow_id: null,
    feed_type: 'Boma Rhodes Hay',
    quantity: 15,
    unit: 'bales',
    cost: 4500,
    record_date: '2026-10-02',
    group_target: 'Dry Cows & Heifers',
    notes: 'Dry forage supplementation.'
  },
  {
    id: 'fd-005',
    cow_id: null,
    feed_type: 'Mineral Salt Lick',
    quantity: 10,
    unit: 'kg',
    cost: 1800,
    record_date: '2026-10-01',
    group_target: 'All Herd',
    notes: 'High phosphorus mineral blocks placed in paddocks.'
  }
];

export const INITIAL_EXPENSES = [
  {
    id: 'exp-001',
    record_date: '2026-10-03',
    category: 'Feed',
    description: 'Purchase of 20 bags High-Yield Dairy Meal 50kg',
    amount: 54000,
    payment_method: 'M-Pesa',
    notes: 'Purchased from Highland Feeds Eldoret'
  },
  {
    id: 'exp-002',
    record_date: '2026-09-28',
    category: 'Veterinary',
    description: 'Vet visit fee & mastitis medication for KEF-106',
    amount: 4500,
    payment_method: 'M-Pesa',
    notes: 'Dr. John Omondi invoice #8402'
  },
  {
    id: 'exp-003',
    record_date: '2026-09-30',
    category: 'Labour',
    description: 'Monthly salaries for 3 farm assistants',
    amount: 60000,
    payment_method: 'Bank Transfer',
    notes: 'September payroll'
  },
  {
    id: 'exp-004',
    record_date: '2026-09-25',
    category: 'Utilities',
    description: 'Electricity bill for milking machine & cold tank',
    amount: 14200,
    payment_method: 'M-Pesa',
    notes: 'KPLC monthly token'
  },
  {
    id: 'exp-005',
    record_date: '2026-09-20',
    category: 'Equipment',
    description: 'Servicing vacuum pump & replacing teat cup liners',
    amount: 8500,
    payment_method: 'Cash',
    notes: 'Milking parlor maintenance'
  },
  {
    id: 'exp-006',
    record_date: '2026-09-16',
    category: 'Breeding',
    description: 'Semex AI straws (3 units Friesian + 2 units Jersey)',
    amount: 12500,
    payment_method: 'M-Pesa',
    notes: 'Imported high genetic merit straws'
  },
  {
    id: 'exp-007',
    record_date: '2026-09-10',
    category: 'Transport',
    description: 'Fuel for farm pickup & silage transport',
    amount: 9800,
    payment_method: 'M-Pesa',
    notes: 'Rubis Station Naivasha'
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-001',
    name: 'New KCC Naivasha Depot',
    phone: '+254 722 111 222',
    email: 'naivasha@newkcc.co.ke',
    location: 'Naivasha Town Industrial Area',
    customer_type: 'Cooperative',
    notes: 'Bulk morning milk delivery contract (150L daily at KES 65/L)'
  },
  {
    id: 'cust-002',
    name: 'Naivasha Country Club Hotel',
    phone: '+254 733 444 555',
    email: 'procurement@countryclub.co.ke',
    location: 'Moi South Lake Road, Naivasha',
    customer_type: 'Hotel',
    notes: 'Premium grade A fresh milk daily (40L at KES 75/L)'
  },
  {
    id: 'cust-003',
    name: 'St. Andrews School Boarding',
    phone: '+254 711 999 888',
    email: 'accounts@standrews.ac.ke',
    location: 'Naivasha Sub-county',
    customer_type: 'School',
    notes: 'Delivered Monday, Wednesday, Friday (60L per batch at KES 70/L)'
  },
  {
    id: 'cust-004',
    name: 'Mama Wanjiku Dairy Shop',
    phone: '+254 720 333 444',
    email: 'wanjiku@gmail.com',
    location: 'KCC Village Center',
    customer_type: 'Shop',
    notes: 'Evening retail milk buyer (30L daily at KES 70/L)'
  },
  {
    id: 'cust-005',
    name: 'Mr. David Ochieng',
    phone: '+254 701 555 666',
    email: 'david.ochieng@gmail.com',
    location: 'Lake View Estate',
    customer_type: 'Individual',
    notes: 'Household daily subscriber (5L daily at KES 80/L)'
  }
];

export const INITIAL_MILK_SALES = [
  {
    id: 'sale-001',
    customer_id: 'cust-001',
    sale_date: '2026-10-04',
    quantity_litres: 150,
    price_per_litre: 65,
    total_amount: 9750,
    payment_status: 'Paid',
    payment_method: 'Bank Transfer',
    notes: 'Bulk KCC delivery ticket #8941'
  },
  {
    id: 'sale-002',
    customer_id: 'cust-002',
    sale_date: '2026-10-04',
    quantity_litres: 40,
    price_per_litre: 75,
    total_amount: 3000,
    payment_status: 'Paid',
    payment_method: 'M-Pesa',
    notes: 'Morning hotel delivery'
  },
  {
    id: 'sale-003',
    customer_id: 'cust-003',
    sale_date: '2026-10-03',
    quantity_litres: 60,
    price_per_litre: 70,
    total_amount: 4200,
    payment_status: 'Pending',
    payment_method: 'Bank Transfer',
    notes: 'School bi-weekly invoice'
  },
  {
    id: 'sale-004',
    customer_id: 'cust-004',
    sale_date: '2026-10-04',
    quantity_litres: 30,
    price_per_litre: 70,
    total_amount: 2100,
    payment_status: 'Paid',
    payment_method: 'M-Pesa',
    notes: 'Milk shop cash collection'
  },
  {
    id: 'sale-005',
    customer_id: 'cust-005',
    sale_date: '2026-10-04',
    quantity_litres: 5,
    price_per_litre: 80,
    total_amount: 400,
    payment_status: 'Paid',
    payment_method: 'M-Pesa',
    notes: 'Daily household subscriber'
  },
  {
    id: 'sale-006',
    customer_id: 'cust-001',
    sale_date: '2026-10-03',
    quantity_litres: 155,
    price_per_litre: 65,
    total_amount: 10075,
    payment_status: 'Paid',
    payment_method: 'Bank Transfer',
    notes: 'Bulk delivery'
  },
  {
    id: 'sale-007',
    customer_id: 'cust-002',
    sale_date: '2026-10-03',
    quantity_litres: 40,
    price_per_litre: 75,
    total_amount: 3000,
    payment_status: 'Paid',
    payment_method: 'M-Pesa',
    notes: 'Hotel supply'
  }
];

export const INITIAL_SUPPLIERS = [
  {
    id: 'sup-001',
    name: 'Highland Feeds Ltd',
    contact_person: 'Peter Njuguna',
    phone: '+254 722 555 777',
    email: 'sales@highlandfeeds.co.ke',
    location: 'Eldoret Industrial Area',
    products_supplied: 'Dairy Meal 24%, Maize Germ, Wheat Bran, Cotton Seed Cake',
    notes: 'Primary concentrates supplier. Provides volume discounts.'
  },
  {
    id: 'sup-002',
    name: 'VetCare Kenya Ltd',
    contact_person: 'Dr. Anne Kiprop',
    phone: '+254 733 888 999',
    email: 'info@vetcarekenya.co.ke',
    location: 'Nakuru Town',
    products_supplied: 'Vaccines, Antibiotics, Mastitis Tubes, Dewormers, Syringes',
    notes: 'Certified veterinary supplies distributor.'
  },
  {
    id: 'sup-003',
    name: 'Rift Valley Hay Producers',
    contact_person: 'Joseph Ole Ntimama',
    phone: '+254 700 123 456',
    email: 'joseph@riftvalleyhay.co.ke',
    location: 'Mai Mahiu, Naivasha',
    products_supplied: 'Boma Rhodes Hay Bales, Lucerne Hay',
    notes: 'High quality weed-free hay bales.'
  },
  {
    id: 'sup-004',
    name: 'DeLaval Kenya Equipment',
    contact_person: 'Francis Kariuki',
    phone: '+254 711 444 333',
    email: 'sales@delavalkenya.co.ke',
    location: 'Nairobi Westlands',
    products_supplied: 'Milking machines, spare parts, teat dip, udder wash',
    notes: 'Equipment maintenance contract supplier.'
  }
];

export const INITIAL_INVENTORY = [
  {
    id: 'inv-001',
    supplier_id: 'sup-001',
    item_name: 'High-Yield Dairy Meal (50kg)',
    category: 'Feed',
    quantity: 18,
    unit: 'bags',
    purchase_price: 2700,
    purchase_date: '2026-09-30',
    expiry_date: '2027-03-30',
    min_stock_level: 10,
    notes: 'Store in dry ventilated store.'
  },
  {
    id: 'inv-002',
    supplier_id: 'sup-003',
    item_name: 'Boma Rhodes Hay Bales',
    category: 'Feed',
    quantity: 45,
    unit: 'bales',
    purchase_price: 300,
    purchase_date: '2026-09-15',
    expiry_date: null,
    min_stock_level: 20,
    notes: 'Stacked in barn #2.'
  },
  {
    id: 'inv-003',
    supplier_id: 'sup-002',
    item_name: 'Spectramast LC Mastitis Tubes',
    category: 'Veterinary Drugs',
    quantity: 4,
    unit: 'boxes',
    purchase_price: 1800,
    purchase_date: '2026-08-10',
    expiry_date: '2027-08-10',
    min_stock_level: 5, // Triggers low stock alert!
    notes: 'Requires cool refrigeration.'
  },
  {
    id: 'inv-004',
    supplier_id: 'sup-002',
    item_name: 'Albendazole 10% Dewormer (1 Litre)',
    category: 'Veterinary Drugs',
    quantity: 3,
    unit: 'bottles',
    purchase_price: 1500,
    purchase_date: '2026-07-20',
    expiry_date: '2028-01-20',
    min_stock_level: 2,
    notes: 'Broad spectrum oral drench.'
  },
  {
    id: 'inv-005',
    supplier_id: 'sup-004',
    item_name: 'Iodine Teat Dip (5 Litres)',
    category: 'Cleaning Supplies',
    quantity: 2,
    unit: 'jerrycans',
    purchase_price: 2200,
    purchase_date: '2026-09-01',
    expiry_date: '2027-09-01',
    min_stock_level: 3, // Triggers low stock alert!
    notes: 'Post-milking teat dip sanitizer.'
  },
  {
    id: 'inv-006',
    supplier_id: 'sup-004',
    item_name: 'Stainless Steel Milking Buckets 20L',
    category: 'Milking Equipment',
    quantity: 8,
    unit: 'pcs',
    purchase_price: 4500,
    purchase_date: '2025-11-10',
    expiry_date: null,
    min_stock_level: 5,
    notes: 'Grade 304 food contact steel.'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-001',
    title: 'Vaccination Due Soon',
    message: 'Lumpy Skin Disease (LSD) booster for Buttercup (KEF-103) is due on 15th Oct 2026.',
    type: 'vaccination',
    is_read: false,
    created_at: '2026-10-04T08:00:00Z',
    link_url: '/health'
  },
  {
    id: 'notif-002',
    title: 'Expected Calving Alert',
    message: 'Clarababelle (KEF-104) is expected to calve in approximately 7 days!',
    type: 'calving',
    is_read: false,
    created_at: '2026-10-04T09:30:00Z',
    link_url: '/breeding'
  },
  {
    id: 'notif-003',
    title: 'Low Stock Warning',
    message: 'Spectramast LC Mastitis Tubes level (4 boxes) is below minimum safety threshold (5 boxes).',
    type: 'inventory',
    is_read: false,
    created_at: '2026-10-03T14:15:00Z',
    link_url: '/inventory'
  },
  {
    id: 'notif-004',
    title: 'Animal Sick Alert',
    message: 'Stella (KEF-106) is currently undergoing treatment for Clinical Mastitis.',
    type: 'health',
    is_read: false,
    created_at: '2026-09-28T10:00:00Z',
    link_url: '/cows/cow-106'
  },
  {
    id: 'notif-005',
    title: 'Unpaid Customer Invoice',
    message: 'St. Andrews School Boarding has an unpaid invoice of KES 4,200.',
    type: 'payment',
    is_read: false,
    created_at: '2026-10-03T16:00:00Z',
    link_url: '/sales'
  }
];
