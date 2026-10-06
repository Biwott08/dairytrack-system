import React from 'react';

export const LoadingSpinner = ({ label = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-slate-500">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3"></div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};
