import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { store } from '../lib/store';

const DEFAULT_FARM_ID = '11111111-1111-1111-1111-111111111111';

const attachFarmId = (record) => {
  return {
    farm_id: DEFAULT_FARM_ID,
    ...record
  };
};

export const apiService = {
  // Auth
  async login(email, password) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      if (!email || !password) throw new Error("Please enter both email and password");
      const user = { id: 'usr-001', email, name: email.split('@')[0], farmName: 'Green Valley Dairy Farm' };
      store.saveUser(user);
      return { user, session: { token: 'mock-session-token' } };
    }
  },

  async register(email, password, farmName, ownerName) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { farm_name: farmName, owner_name: ownerName } }
      });
      if (error) throw error;
      return data;
    } else {
      const user = { id: `usr-${Date.now()}`, email, name: ownerName, farmName };
      store.saveUser(user);
      store.saveFarm({ ...store.getFarm(), name: farmName, ownerName });
      return { user, session: { token: 'mock-session-token' } };
    }
  },

  async logout() {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('dfms_session');
    return true;
  },

  // Cows
  async getCows() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('cows').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getCows();
    }
    return store.getCows();
  },

  async addCow(cowData) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(cowData);
      const { data, error } = await supabase.from('cows').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addCow(cowData);
  },

  async updateCow(id, cowData) {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('cows').update(cowData).eq('id', id).select();
      if (error) throw error;
      return data[0];
    }
    return store.updateCow(id, cowData);
  },

  async deleteCow(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('cows').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    return store.deleteCow(id);
  },

  // Milk Production
  async getMilkRecords() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('milk_production').select('*, cows(name, tag_number)').order('record_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getMilkRecords();
    }
    return store.getMilkRecords();
  },

  async addMilkRecord(record) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(record);
      const { data, error } = await supabase.from('milk_production').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addMilkRecord(record);
  },

  async deleteMilkRecord(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('milk_production').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    return store.deleteMilkRecord(id);
  },

  // Health & Vaccinations
  async getHealthRecords() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('health_records').select('*, cows(name, tag_number)').order('record_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getHealthRecords();
    }
    return store.getHealthRecords();
  },

  async addHealthRecord(record) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(record);
      const { data, error } = await supabase.from('health_records').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addHealthRecord(record);
  },

  async deleteHealthRecord(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('health_records').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    return store.deleteHealthRecord(id);
  },

  async getVaccinations() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('vaccinations').select('*, cows(name, tag_number)').order('administered_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getVaccinations();
    }
    return store.getVaccinations();
  },

  async addVaccination(record) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(record);
      const { data, error } = await supabase.from('vaccinations').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addVaccination(record);
  },

  // Breeding
  async getBreedingRecords() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('breeding_records').select('*, cows(name, tag_number)').order('heat_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getBreedingRecords();
    }
    return store.getBreedingRecords();
  },

  async addBreedingRecord(record) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(record);
      const { data, error } = await supabase.from('breeding_records').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addBreedingRecord(record);
  },

  // Feeding
  async getFeedRecords() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('feed_records').select('*').order('record_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getFeedRecords();
    }
    return store.getFeedRecords();
  },

  async addFeedRecord(record) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(record);
      const { data, error } = await supabase.from('feed_records').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addFeedRecord(record);
  },

  // Expenses
  async getExpenses() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('expenses').select('*').order('record_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getExpenses();
    }
    return store.getExpenses();
  },

  async addExpense(expense) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(expense);
      const { data, error } = await supabase.from('expenses').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addExpense(expense);
  },

  async deleteExpense(id) {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('expenses').delete().eq('id', id);
      if (error) throw error;
      return true;
    }
    return store.deleteExpense(id);
  },

  // Customers & Sales
  async getCustomers() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) throw error;
      return data && data.length > 0 ? data : store.getCustomers();
    }
    return store.getCustomers();
  },

  async addCustomer(customer) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(customer);
      const { data, error } = await supabase.from('customers').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addCustomer(customer);
  },

  async getSales() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('milk_sales').select('*, customers(name)').order('sale_date', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getSales();
    }
    return store.getSales();
  },

  async addSale(sale) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(sale);
      const { data, error } = await supabase.from('milk_sales').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addSale(sale);
  },

  // Inventory & Suppliers
  async getSuppliers() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('suppliers').select('*');
      if (error) throw error;
      return data && data.length > 0 ? data : store.getSuppliers();
    }
    return store.getSuppliers();
  },

  async addSupplier(supplier) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(supplier);
      const { data, error } = await supabase.from('suppliers').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addSupplier(supplier);
  },

  async getInventory() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('inventory').select('*, suppliers(name)').order('item_name', { ascending: true });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getInventory();
    }
    return store.getInventory();
  },

  async addInventoryItem(item) {
    if (isSupabaseConfigured()) {
      const payload = attachFarmId(item);
      const { data, error } = await supabase.from('inventory').insert([payload]).select();
      if (error) throw error;
      return data[0];
    }
    return store.addInventoryItem(item);
  },

  // Notifications
  async getNotifications() {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data && data.length > 0 ? data : store.getNotifications();
    }
    return store.getNotifications();
  }
};
