import React from 'react';

export const StatCard = ({ title, value, subtext, icon: Icon, trend, trendValue, color = 'emerald' }) => {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60',
    blue: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200/60',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/60',
    rose: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/60',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/60',
  };

  const iconBgMap = {
    emerald: 'bg-emerald-500 text-white shadow-emerald-500/20',
    blue: 'bg-sky-500 text-white shadow-sky-500/20',
    amber: 'bg-amber-500 text-white shadow-amber-500/20',
    rose: 'bg-rose-500 text-white shadow-rose-500/20',
    purple: 'bg-purple-500 text-white shadow-purple-500/20',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl shadow-lg ${iconBgMap[color] || iconBgMap.emerald}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtext || trendValue) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trendValue && (
            <span
              className={`font-semibold px-2 py-0.5 rounded-full ${
                trend === 'up'
                  ? 'bg-emerald-100 text-emerald-800'
                  : trend === 'down'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
            </span>
          )}
          {subtext && <span className="text-slate-500 font-medium">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
