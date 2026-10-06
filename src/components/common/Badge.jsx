import React from 'react';

export const Badge = ({ children, variant = 'emerald', size = 'md' }) => {
  const variantClasses = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    sky: 'bg-sky-100 text-sky-800 border-sky-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${variantClasses[variant] || variantClasses.emerald} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
};
