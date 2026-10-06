import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { FeedFormModal } from './FeedFormModal';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Wheat, Plus, Download } from 'lucide-react';

export const FeedingList = () => {
  const { cows, feedRecords, addFeedRecord } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalFeedCost = feedRecords.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
  const lactatingCount = cows.filter(c => c.status === 'Lactating').length || 1;
  const avgCostPerCow = totalFeedCost / lactatingCount;

  const handleExportCSV = () => {
    const headers = ['Date', 'Feed Type', 'Target Group', 'Quantity', 'Unit', 'Total Cost (KES)'];
    const rows = feedRecords.map(f => [
      f.record_date,
      f.feed_type,
      f.group_target,
      f.quantity,
      f.unit,
      f.cost
    ]);
    exportToCSV('Feed_Management_Log', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Date', 'Feed Type', 'Group', 'Quantity', 'Cost (KES)'];
    const rows = feedRecords.map(f => [
      formatDate(f.record_date),
      f.feed_type,
      f.group_target,
      `${f.quantity} ${f.unit}`,
      formatCurrency(f.cost)
    ]);
    exportToPDF('HERD NUTRITION & FEED EXPENSE REPORT', 'Summary of fodder and concentrate feeding costs', headers, rows, 'Feed_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Wheat className="w-7 h-7 text-amber-600" /> Herd Feeding & Nutrition Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log silage, Napier grass, dairy meal concentrates and mineral supplement allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> PDF Report
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Record Feed Allocation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Accumulated Feed Spend</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(totalFeedCost)}</h3>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-xs">
          <p className="text-xs font-bold text-amber-800 uppercase">Avg Feed Cost per Lactating Cow</p>
          <h3 className="text-2xl font-black text-amber-950 mt-1">{formatCurrency(avgCostPerCow)}</h3>
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <p className="text-xs font-bold text-emerald-800 uppercase">Active Ration Strategy</p>
          <h3 className="text-base font-bold text-emerald-950 mt-1">High-Protein TMR (Total Mixed Ration)</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Feed Type</th>
                <th className="p-4">Target Herd Group</th>
                <th className="p-4">Quantity / Unit</th>
                <th className="p-4">Cost (KES)</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feedRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400">
                    No feed records logged.
                  </td>
                </tr>
              ) : (
                feedRecords.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{formatDate(f.record_date)}</td>
                    <td className="p-4 font-black text-slate-900">{f.feed_type}</td>
                    <td className="p-4 font-semibold text-slate-700">{f.group_target}</td>
                    <td className="p-4 font-bold text-amber-700">{f.quantity} {f.unit}</td>
                    <td className="p-4 font-black text-emerald-700">{formatCurrency(f.cost)}</td>
                    <td className="p-4 text-slate-500 italic max-w-xs truncate">{f.notes || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FeedFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addFeedRecord}
        cows={cows}
      />
    </div>
  );
};
