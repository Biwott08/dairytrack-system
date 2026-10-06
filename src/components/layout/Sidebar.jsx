import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Beef,
  Milk,
  HeartPulse,
  Activity,
  Wheat,
  Receipt,
  TrendingUp,
  Users,
  Package,
  Truck,
  FileSpreadsheet,
  Settings,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { farm } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Cows / Herd', path: '/cows', icon: Beef },
    { name: 'Milk Production', path: '/milk', icon: Milk },
    { name: 'Breeding', path: '/breeding', icon: HeartPulse },
    { name: 'Animal Health', path: '/health', icon: Activity },
    { name: 'Feeding', path: '/feeding', icon: Wheat },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Milk Sales', path: '/sales', icon: TrendingUp },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Suppliers', path: '/suppliers', icon: Truck },
    { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-xl shadow-lg shadow-emerald-900/50">
              🐄
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                DairyTrack <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">PRO</span>
              </h1>
              <p className="text-xs text-slate-400 truncate max-w-[120px]">
                {farm?.name || 'Green Valley'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2">
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Management Modules
            </p>
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-900/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* System Banner Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-800/50 rounded-xl p-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio Ready</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Kenyan Shillings (KES) • Normalized PostgreSQL Schema
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
