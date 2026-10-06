import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFarm } from '../../context/FarmContext';
import { useNotifications } from '../../context/NotificationContext';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { Settings, Save, RefreshCw, Database, CheckCircle2, Shield, Copy } from 'lucide-react';

export const FarmSettings = () => {
  const { farm, updateFarmProfile } = useAuth();
  const { resetDemoData } = useFarm();
  const { notifySuccess } = useNotifications();

  const [formData, setFormData] = useState({
    name: farm?.name || 'Green Valley Dairy Farm',
    ownerName: farm?.ownerName || 'Samuel Kamau',
    email: farm?.email || 'samuel@greenvalleydairy.co.ke',
    phone: farm?.phone || '+254 712 345 678',
    location: farm?.location || 'Naivasha, Nakuru County, Kenya',
    currency: farm?.currency || 'KES',
    totalArea: farm?.totalArea || '25 Acres'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFarmProfile({ ...farm, ...formData });
    notifySuccess("Farm profile settings updated successfully!");
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-7 h-7 text-emerald-600" /> Farm Profile & System Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure farm parameters, currency settings, database connections and demo data reset.
        </p>
      </div>

      {/* Database Connection Status Banner */}
      <div className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
        hasSupabase
          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
          : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${hasSupabase ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`}>
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base">
                {hasSupabase ? 'Supabase PostgreSQL Database Connected' : 'Local Storage Engine Active (Demo Mode)'}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                hasSupabase ? 'bg-emerald-200 text-emerald-900' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {hasSupabase ? 'LIVE SUPABASE' : 'OUT-OF-BOX READY'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${hasSupabase ? 'text-emerald-800' : 'text-slate-400'}`}>
              {hasSupabase
                ? 'Connected to live cloud PostgreSQL cluster with Row Level Security.'
                : 'All CRUD operations are saved in browser LocalStorage. Connect Supabase by setting .env variables.'}
            </p>
          </div>
        </div>
      </div>

      {/* Farm Profile Settings Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Farm Account Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Farm Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Owner / Manager Name *</label>
              <input
                type="text"
                name="ownerName"
                required
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location / Sub-county</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Currency Standard</label>
              <input
                type="text"
                name="currency"
                disabled
                value={formData.currency}
                className="w-full px-3 py-2 border rounded-xl bg-slate-100 text-slate-500 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Acreage</label>
              <input
                type="text"
                name="totalArea"
                value={formData.totalArea}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Danger / Demo Reset Zone */}
      <div className="bg-rose-50/60 p-6 rounded-2xl border border-rose-200 space-y-3">
        <h3 className="font-bold text-rose-900 text-base">Reset Demo Data</h3>
        <p className="text-xs text-rose-700">
          Reset all cows, milk records, sales and expenses back to the initial Green Valley Dairy Farm dataset.
        </p>
        <button
          onClick={resetDemoData}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Reset Database to Demo State
        </button>
      </div>
    </div>
  );
};
