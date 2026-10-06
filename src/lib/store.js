import {
  INITIAL_FARM,
  INITIAL_USER,
  INITIAL_COWS,
  INITIAL_MILK_PRODUCTION,
  INITIAL_HEALTH_RECORDS,
  INITIAL_VACCINATIONS,
  INITIAL_BREEDING_RECORDS,
  INITIAL_FEED_RECORDS,
  INITIAL_EXPENSES,
  INITIAL_CUSTOMERS,
  INITIAL_MILK_SALES,
  INITIAL_SUPPLIERS,
  INITIAL_INVENTORY,
  INITIAL_NOTIFICATIONS
} from './initialMockData';

const STORAGE_KEYS = {
  FARM: 'dfms_farm',
  USER: 'dfms_user',
  COWS: 'dfms_cows',
  MILK: 'dfms_milk_production',
  HEALTH: 'dfms_health_records',
  VACCINATIONS: 'dfms_vaccinations',
  BREEDING: 'dfms_breeding_records',
  FEEDING: 'dfms_feed_records',
  EXPENSES: 'dfms_expenses',
  CUSTOMERS: 'dfms_customers',
  SALES: 'dfms_milk_sales',
  SUPPLIERS: 'dfms_suppliers',
  INVENTORY: 'dfms_inventory',
  NOTIFICATIONS: 'dfms_notifications'
};

// Helper to initialize local storage with mock data if not present
const getStoredData = (key, defaultData) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from LocalStorage`, error);
    return defaultData;
  }
};

const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to LocalStorage`, error);
  }
};

export const store = {
  // Farm & User
  getFarm: () => getStoredData(STORAGE_KEYS.FARM, INITIAL_FARM),
  saveFarm: (farm) => setStoredData(STORAGE_KEYS.FARM, farm),
  getUser: () => getStoredData(STORAGE_KEYS.USER, INITIAL_USER),
  saveUser: (user) => setStoredData(STORAGE_KEYS.USER, user),

  // Cows
  getCows: () => getStoredData(STORAGE_KEYS.COWS, INITIAL_COWS),
  addCow: (cow) => {
    const cows = store.getCows();
    const newCow = { ...cow, id: `cow-${Date.now()}` };
    const updated = [newCow, ...cows];
    setStoredData(STORAGE_KEYS.COWS, updated);
    return newCow;
  },
  updateCow: (id, updatedFields) => {
    const cows = store.getCows();
    const updated = cows.map(c => c.id === id ? { ...c, ...updatedFields } : c);
    setStoredData(STORAGE_KEYS.COWS, updated);
    return updated.find(c => c.id === id);
  },
  deleteCow: (id) => {
    const cows = store.getCows();
    const updated = cows.filter(c => c.id !== id);
    setStoredData(STORAGE_KEYS.COWS, updated);
    return true;
  },

  // Milk Production
  getMilkRecords: () => getStoredData(STORAGE_KEYS.MILK, INITIAL_MILK_PRODUCTION),
  addMilkRecord: (record) => {
    const records = store.getMilkRecords();
    const total_qty = (Number(record.morning_qty) || 0) + (Number(record.evening_qty) || 0);
    const newRecord = { ...record, total_qty, id: `milk-${Date.now()}` };
    const updated = [newRecord, ...records];
    setStoredData(STORAGE_KEYS.MILK, updated);

    // Update current_milk_yield for cow
    if (record.cow_id) {
      store.updateCow(record.cow_id, { current_milk_yield: total_qty });
    }
    return newRecord;
  },
  deleteMilkRecord: (id) => {
    const records = store.getMilkRecords();
    setStoredData(STORAGE_KEYS.MILK, records.filter(r => r.id !== id));
    return true;
  },

  // Health
  getHealthRecords: () => getStoredData(STORAGE_KEYS.HEALTH, INITIAL_HEALTH_RECORDS),
  addHealthRecord: (record) => {
    const records = store.getHealthRecords();
    const newRecord = { ...record, id: `hlth-${Date.now()}` };
    setStoredData(STORAGE_KEYS.HEALTH, [newRecord, ...records]);
    
    // Automatically flag cow as sick if recovery status is Under Treatment
    if (record.recovery_status === 'Under Treatment' && record.cow_id) {
      store.updateCow(record.cow_id, { status: 'Sick' });
    }
    return newRecord;
  },
  deleteHealthRecord: (id) => {
    const records = store.getHealthRecords();
    setStoredData(STORAGE_KEYS.HEALTH, records.filter(r => r.id !== id));
    return true;
  },

  // Vaccinations
  getVaccinations: () => getStoredData(STORAGE_KEYS.VACCINATIONS, INITIAL_VACCINATIONS),
  addVaccination: (record) => {
    const records = store.getVaccinations();
    const newRecord = { ...record, id: `vac-${Date.now()}` };
    setStoredData(STORAGE_KEYS.VACCINATIONS, [newRecord, ...records]);
    return newRecord;
  },

  // Breeding
  getBreedingRecords: () => getStoredData(STORAGE_KEYS.BREEDING, INITIAL_BREEDING_RECORDS),
  addBreedingRecord: (record) => {
    const records = store.getBreedingRecords();
    const newRecord = { ...record, id: `brd-${Date.now()}` };
    setStoredData(STORAGE_KEYS.BREEDING, [newRecord, ...records]);
    if (record.pregnancy_confirmed && record.cow_id) {
      store.updateCow(record.cow_id, { status: 'Pregnant' });
    }
    return newRecord;
  },
  updateBreedingRecord: (id, updatedFields) => {
    const records = store.getBreedingRecords();
    const updated = records.map(r => r.id === id ? { ...r, ...updatedFields } : r);
    setStoredData(STORAGE_KEYS.BREEDING, updated);
    return updated.find(r => r.id === id);
  },

  // Feeding
  getFeedRecords: () => getStoredData(STORAGE_KEYS.FEEDING, INITIAL_FEED_RECORDS),
  addFeedRecord: (record) => {
    const records = store.getFeedRecords();
    const newRecord = { ...record, id: `fd-${Date.now()}` };
    setStoredData(STORAGE_KEYS.FEEDING, [newRecord, ...records]);
    return newRecord;
  },

  // Expenses
  getExpenses: () => getStoredData(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES),
  addExpense: (expense) => {
    const expenses = store.getExpenses();
    const newExpense = { ...expense, id: `exp-${Date.now()}` };
    setStoredData(STORAGE_KEYS.EXPENSES, [newExpense, ...expenses]);
    return newExpense;
  },
  deleteExpense: (id) => {
    const expenses = store.getExpenses();
    setStoredData(STORAGE_KEYS.EXPENSES, expenses.filter(e => e.id !== id));
    return true;
  },

  // Customers
  getCustomers: () => getStoredData(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS),
  addCustomer: (customer) => {
    const customers = store.getCustomers();
    const newCust = { ...customer, id: `cust-${Date.now()}` };
    setStoredData(STORAGE_KEYS.CUSTOMERS, [newCust, ...customers]);
    return newCust;
  },

  // Milk Sales
  getSales: () => getStoredData(STORAGE_KEYS.SALES, INITIAL_MILK_SALES),
  addSale: (sale) => {
    const sales = store.getSales();
    const total_amount = (Number(sale.quantity_litres) || 0) * (Number(sale.price_per_litre) || 0);
    const newSale = { ...sale, total_amount, id: `sale-${Date.now()}` };
    setStoredData(STORAGE_KEYS.SALES, [newSale, ...sales]);
    return newSale;
  },
  updateSaleStatus: (id, payment_status) => {
    const sales = store.getSales();
    const updated = sales.map(s => s.id === id ? { ...s, payment_status } : s);
    setStoredData(STORAGE_KEYS.SALES, updated);
  },

  // Suppliers
  getSuppliers: () => getStoredData(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS),
  addSupplier: (supplier) => {
    const suppliers = store.getSuppliers();
    const newSup = { ...supplier, id: `sup-${Date.now()}` };
    setStoredData(STORAGE_KEYS.SUPPLIERS, [newSup, ...suppliers]);
    return newSup;
  },

  // Inventory
  getInventory: () => getStoredData(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY),
  addInventoryItem: (item) => {
    const inventory = store.getInventory();
    const newItem = { ...item, id: `inv-${Date.now()}` };
    setStoredData(STORAGE_KEYS.INVENTORY, [newItem, ...inventory]);
    return newItem;
  },
  updateInventoryQuantity: (id, qtyChange) => {
    const inventory = store.getInventory();
    const updated = inventory.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + qtyChange);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setStoredData(STORAGE_KEYS.INVENTORY, updated);
  },

  // Notifications
  getNotifications: () => getStoredData(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),
  markNotificationAsRead: (id) => {
    const notifications = store.getNotifications();
    const updated = notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
    setStoredData(STORAGE_KEYS.NOTIFICATIONS, updated);
  },

  // Reset to default sample data
  resetDemoData: () => {
    localStorage.clear();
    setStoredData(STORAGE_KEYS.FARM, INITIAL_FARM);
    setStoredData(STORAGE_KEYS.USER, INITIAL_USER);
    setStoredData(STORAGE_KEYS.COWS, INITIAL_COWS);
    setStoredData(STORAGE_KEYS.MILK, INITIAL_MILK_PRODUCTION);
    setStoredData(STORAGE_KEYS.HEALTH, INITIAL_HEALTH_RECORDS);
    setStoredData(STORAGE_KEYS.VACCINATIONS, INITIAL_VACCINATIONS);
    setStoredData(STORAGE_KEYS.BREEDING, INITIAL_BREEDING_RECORDS);
    setStoredData(STORAGE_KEYS.FEEDING, INITIAL_FEED_RECORDS);
    setStoredData(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
    setStoredData(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    setStoredData(STORAGE_KEYS.SALES, INITIAL_MILK_SALES);
    setStoredData(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
    setStoredData(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
    setStoredData(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return true;
  }
};
