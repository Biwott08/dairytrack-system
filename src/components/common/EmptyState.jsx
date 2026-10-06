import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No records found",
  description = "Get started by adding your first record or adjust your search filters.",
  actionButton
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-dashed border-slate-200 my-4">
      <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">{description}</p>
      {actionButton}
    </div>
  );
};
