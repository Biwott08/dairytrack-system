import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { store } from '../lib/store';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata?.owner_name || session.user.email.split('@')[0],
              farmName: session.user.user_metadata?.farm_name || 'Green Valley Dairy Farm'
            });
          } else {
            // Default to local stored demo user for immediate review capability
            const localUser = store.getUser();
            setUser(localUser);
          }
        } else {
          const localUser = store.getUser();
          setUser(localUser);
        }

        const localFarm = store.getFarm();
        setFarm(localFarm);
      } catch (err) {
        console.error("Auth init error", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.owner_name || session.user.email.split('@')[0],
            farmName: session.user.user_metadata?.farm_name || 'Green Valley Dairy Farm'
          });
        } else {
          setUser(null);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiService.login(email, password);
      const currentUser = res.user || store.getUser();
      setUser(currentUser);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, farmName, ownerName) => {
    setLoading(true);
    try {
      const res = await apiService.register(email, password, farmName, ownerName);
      const currentUser = { id: res.user?.id || `usr-${Date.now()}`, email, name: ownerName, farmName };
      setUser(currentUser);
      setFarm(prev => ({ ...prev, name: farmName, ownerName }));
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateFarmProfile = (updatedFarm) => {
    setFarm(updatedFarm);
    store.saveFarm(updatedFarm);
  };

  return (
    <AuthContext.Provider value={{ user, farm, loading, login, register, logout, updateFarmProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
