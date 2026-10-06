import React, { useState } from 'react';
import { Menu, Bell, User, LogOut, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFarm } from '../../context/FarmContext';
import { formatDate } from '../../utils/formatters';

export const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, resetDemoData } = useFarm();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between shadow-2xs">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Farm ID: <strong className="text-slate-800">GVF-NAIVASHA-01</strong></span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Reset Demo Data Button */}
        <button
          onClick={resetDemoData}
          title="Reset to original demo data"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
        >
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
          <span>Reset Demo</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">Notifications ({unreadCount} unread)</h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-emerald-600 hover:underline font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3.5 text-xs cursor-pointer hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                        !n.is_read ? 'bg-emerald-50/40 font-medium' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'vaccination' || n.type === 'calving' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-slate-800">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{formatDate(n.created_at)}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'Samuel Kamau'}</p>
              <p className="text-[10px] text-slate-500">Manager</p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name || 'Samuel Kamau'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'samuel@greenvalleydairy.co.ke'}</p>
              </div>

              <div className="py-1">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
