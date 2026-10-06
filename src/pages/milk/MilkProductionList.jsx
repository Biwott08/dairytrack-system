import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { MilkFormModal } from './MilkFormModal';
import { formatDate, formatNumber } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Badge } from '../../components/common/Badge';
import { Milk, Plus, Download, TrendingUp, Award, AlertCircle, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const MilkProductionList = () => {
  const { cows, milkRecords, addMilkRecord } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const filteredRecords = selectedDate
    ? milkRecords.filter(m => m.record_date === selectedDate)
    : milkRecords;

  // Stats
  const totalVolumeHarvested = milkRecords.reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0);
  const totalLogs = milkRecords.length;
  const avgYieldPerLog = totalLogs > 0 ? (totalVolumeHarvested / totalLogs) : 0;

  // Highest & Lowest Producers
  const cowProductionMap = {};
  cows.forEach(c => { cowProductionMap[c.id] = { name: c.name, tag: c.tag_number, total: 0, count: 0 }; });
  milkRecords.forEach(m => {
    if (cowProductionMap[m.cow_id]) {
      cowProductionMap[m.cow_id].total += Number(m.total_qty) || 0;
      cowProductionMap[m.cow_id].count += 1;
    }
  });

  const producerStats = Object.values(cowProductionMap)
    .map(p => ({ ...p, avg: p.count > 0 ? p.total / p.count : 0 }))
    .filter(p => p.count > 0)
    .sort((a, b) => b.avg - a.avg);

  const topProducer = producerStats[0];
  const lowestProducer = producerStats[producerStats.length - 1];

  const handleExportCSV = () => {
    const headers = ['Date', 'Cow Tag/ID', 'Morning Milk (L)', 'Evening Milk (L)', 'Total Yield (L)', 'Quality Grade'];
    const rows = filteredRecords.map(r => {
      const cow = cows.find(c => c.id === r.cow_id);
      return [
        r.record_date,
        cow ? `${cow.name} (${cow.tag_number})` : r.cow_id,
        r.morning_qty,
        r.evening_qty,
        r.total_qty,
        r.milk_quality || 'Grade A'
      ];
    });
    exportToCSV('Milk_Production_Log', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Date', 'Cattle Name & Tag', 'Morning (L)', 'Evening (L)', 'Total (L)', 'Grade'];
    const rows = filteredRecords.map(r => {
      const cow = cows.find(c => c.id === r.cow_id);
      return [
        formatDate(r.record_date),
        cow ? `${cow.name} (${cow.tag_number})` : r.cow_id,
        `${r.morning_qty} L`,
        `${r.evening_qty} L`,
        `${r.total_qty} L`,
        r.milk_quality || 'Grade A'
      ];
    });
    exportToPDF('DAILY MILK PRODUCTION REPORT', 'Full log of morning & evening milking yields', headers, rows, 'Milk_Production_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Milk className="w-7 h-7 text-emerald-600" /> Daily Milk Production Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log morning and evening milk yields with automatic totals and producer analytics.
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
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Log Milk Yield
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Harvested Volume</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{formatNumber(totalVolumeHarvested, 1)} Litres</h3>
          <p className="text-xs text-slate-500 mt-1">Average {formatNumber(avgYieldPerLog, 1)} L per cow session</p>
        </div>

        {topProducer && (
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-1">
              <Award className="w-4 h-4" /> Highest Producing Cow
            </div>
            <h3 className="text-lg font-black text-emerald-950">{topProducer.name} ({topProducer.tag})</h3>
            <p className="text-xs text-emerald-700 font-bold mt-0.5">Avg {topProducer.avg.toFixed(1)} L / day</p>
          </div>
        )}

        {lowestProducer && (
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase mb-1">
              <AlertCircle className="w-4 h-4" /> Lowest Yield Watch
            </div>
            <h3 className="text-lg font-black text-amber-950">{lowestProducer.name} ({lowestProducer.tag})</h3>
            <p className="text-xs text-amber-800 font-bold mt-0.5">Avg {lowestProducer.avg.toFixed(1)} L / day</p>
          </div>
        )}
      </div>

      {/* Date Filter & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900 text-sm">Milk Production Logs</h3>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-500">Filter Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold"
            />
            {selectedDate && (
              <button onClick={() => setSelectedDate('')} className="text-xs text-emerald-600 underline font-bold">
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Harvest Date</th>
                <th className="p-4">Cattle Name & Tag</th>
                <th className="p-4">Morning (L)</th>
                <th className="p-4">Evening (L)</th>
                <th className="p-4">Daily Total (L)</th>
                <th className="p-4">Quality Grade</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No milk logs found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const cow = cows.find(c => c.id === r.cow_id);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{formatDate(r.record_date)}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-slate-900">{cow ? cow.name : 'Unknown Cow'}</p>
                          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {cow ? cow.tag_number : r.cow_id}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-sky-700">{r.morning_qty} L</td>
                      <td className="p-4 font-semibold text-amber-700">{r.evening_qty} L</td>
                      <td className="p-4 font-black text-emerald-700 text-sm">
                        {r.total_qty || (r.morning_qty + r.evening_qty)} Litres
                      </td>
                      <td className="p-4">
                        <Badge variant={r.milk_quality === 'Rejected' ? 'rose' : 'emerald'}>
                          {r.milk_quality || 'Grade A'}
                        </Badge>
                      </td>
                      <td className="p-4 text-slate-500 italic max-w-xs truncate">{r.notes || '—'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MilkFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addMilkRecord}
        cows={cows}
      />
    </div>
  );
};
