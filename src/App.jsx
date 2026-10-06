import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';

import { Layout } from './components/layout/Layout';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

import { Dashboard } from './pages/Dashboard';
import { CowsList } from './pages/cows/CowsList';
import { CowProfile } from './pages/cows/CowProfile';
import { MilkProductionList } from './pages/milk/MilkProductionList';
import { BreedingList } from './pages/breeding/BreedingList';
import { HealthList } from './pages/health/HealthList';
import { FeedingList } from './pages/feeding/FeedingList';
import { ExpensesList } from './pages/expenses/ExpensesList';
import { SalesList } from './pages/sales/SalesList';
import { CustomersList } from './pages/customers/CustomersList';
import { InventoryList } from './pages/inventory/InventoryList';
import { SuppliersList } from './pages/suppliers/SuppliersList';
import { ReportsOverview } from './pages/reports/ReportsOverview';
import { FarmSettings } from './pages/settings/FarmSettings';
import { LoadingSpinner } from './components/common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner label="Authenticating farm profile..." />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <FarmProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Dashboard Layout Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="cows" element={<CowsList />} />
                <Route path="cows/:id" element={<CowProfile />} />
                <Route path="milk" element={<MilkProductionList />} />
                <Route path="breeding" element={<BreedingList />} />
                <Route path="health" element={<HealthList />} />
                <Route path="feeding" element={<FeedingList />} />
                <Route path="expenses" element={<ExpensesList />} />
                <Route path="sales" element={<SalesList />} />
                <Route path="customers" element={<CustomersList />} />
                <Route path="inventory" element={<InventoryList />} />
                <Route path="suppliers" element={<SuppliersList />} />
                <Route path="reports" element={<ReportsOverview />} />
                <Route path="settings" element={<FarmSettings />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </FarmProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}
