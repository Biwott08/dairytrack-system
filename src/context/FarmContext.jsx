import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import { store } from '../lib/store';
import { useNotifications } from './NotificationContext';

const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [cows, setCows] = useState([]);
  const [milkRecords, setMilkRecords] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [breedingRecords, setBreedingRecords] = useState([]);
  const [feedRecords, setFeedRecords] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { notifySuccess, notifyError } = useNotifications();

  const refreshAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        cowsData,
        milkData,
        healthData,
        vacData,
        breedData,
        feedData,
        expData,
        custData,
        salesData,
        supData,
        invData,
        notifData
      ] = await Promise.all([
        apiService.getCows(),
        apiService.getMilkRecords(),
        apiService.getHealthRecords(),
        apiService.getVaccinations(),
        apiService.getBreedingRecords(),
        apiService.getFeedRecords(),
        apiService.getExpenses(),
        apiService.getCustomers(),
        apiService.getSales(),
        apiService.getSuppliers(),
        apiService.getInventory(),
        apiService.getNotifications()
      ]);

      setCows(cowsData || []);
      setMilkRecords(milkData || []);
      setHealthRecords(healthData || []);
      setVaccinations(vacData || []);
      setBreedingRecords(breedData || []);
      setFeedRecords(feedData || []);
      setExpenses(expData || []);
      setCustomers(custData || []);
      setSales(salesData || []);
      setSuppliers(supData || []);
      setInventory(invData || []);
      setNotifications(notifData || []);
    } catch (err) {
      console.error("Error refreshing farm data", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Actions
  const addCow = async (cowData) => {
    try {
      const res = await apiService.addCow(cowData);
      notifySuccess(`Cow ${cowData.name} (${cowData.tag_number}) added successfully!`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Failed to add cow: ${err.message}`);
      throw err;
    }
  };

  const updateCow = async (id, cowData) => {
    try {
      const res = await apiService.updateCow(id, cowData);
      notifySuccess(`Cow updated successfully!`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Failed to update cow: ${err.message}`);
      throw err;
    }
  };

  const deleteCow = async (id) => {
    try {
      await apiService.deleteCow(id);
      notifySuccess(`Cow record deleted.`);
      await refreshAllData();
    } catch (err) {
      notifyError(`Failed to delete cow: ${err.message}`);
    }
  };

  const addMilkRecord = async (record) => {
    try {
      const res = await apiService.addMilkRecord(record);
      notifySuccess(`Milk record saved: ${res.total_qty || record.morning_qty + record.evening_qty} Litres`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving milk record: ${err.message}`);
    }
  };

  const addHealthRecord = async (record) => {
    try {
      const res = await apiService.addHealthRecord(record);
      notifySuccess(`Health log for diagnosis '${record.diagnosis}' saved.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving health record: ${err.message}`);
    }
  };

  const addVaccination = async (record) => {
    try {
      const res = await apiService.addVaccination(record);
      notifySuccess(`Vaccination '${record.vaccine_name}' logged.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving vaccination: ${err.message}`);
    }
  };

  const addBreedingRecord = async (record) => {
    try {
      const res = await apiService.addBreedingRecord(record);
      notifySuccess(`Breeding record logged successfully.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving breeding record: ${err.message}`);
    }
  };

  const addFeedRecord = async (record) => {
    try {
      const res = await apiService.addFeedRecord(record);
      notifySuccess(`Feed record logged.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving feed record: ${err.message}`);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await apiService.addExpense(expense);
      notifySuccess(`Expense of KES ${expense.amount} logged.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error saving expense: ${err.message}`);
    }
  };

  const addCustomer = async (customer) => {
    try {
      const res = await apiService.addCustomer(customer);
      notifySuccess(`Customer '${customer.name}' added.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error adding customer: ${err.message}`);
    }
  };

  const addSale = async (sale) => {
    try {
      const res = await apiService.addSale(sale);
      notifySuccess(`Sale of ${sale.quantity_litres}L recorded.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error recording sale: ${err.message}`);
    }
  };

  const addSupplier = async (supplier) => {
    try {
      const res = await apiService.addSupplier(supplier);
      notifySuccess(`Supplier '${supplier.name}' added.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error adding supplier: ${err.message}`);
    }
  };

  const addInventoryItem = async (item) => {
    try {
      const res = await apiService.addInventoryItem(item);
      notifySuccess(`Inventory item '${item.item_name}' saved.`);
      await refreshAllData();
      return res;
    } catch (err) {
      notifyError(`Error adding inventory item: ${err.message}`);
    }
  };

  const markNotificationRead = (id) => {
    store.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const resetDemoData = () => {
    store.resetDemoData();
    notifySuccess("Demo database reset to initial state!");
    refreshAllData();
  };

  return (
    <FarmContext.Provider
      value={{
        cows,
        milkRecords,
        healthRecords,
        vaccinations,
        breedingRecords,
        feedRecords,
        expenses,
        customers,
        sales,
        suppliers,
        inventory,
        notifications,
        loading,
        refreshAllData,
        addCow,
        updateCow,
        deleteCow,
        addMilkRecord,
        addHealthRecord,
        addVaccination,
        addBreedingRecord,
        addFeedRecord,
        addExpense,
        addCustomer,
        addSale,
        addSupplier,
        addInventoryItem,
        markNotificationRead,
        resetDemoData
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
