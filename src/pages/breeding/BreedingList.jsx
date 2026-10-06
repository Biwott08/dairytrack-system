import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { BreedingFormModal } from './BreedingFormModal';
import { formatDate, getDaysRemaining } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Badge } from '../../components/common/Badge';
import { HeartPulse, Plus, Download, Calendar, Sparkles } from 'lucide-react';

export const BreedingList = () => {
  const { cows, breedingRecords, addBreedingRecord } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pregnantCows = breedingRecords.filter(b => b.status === 'Pregnant');

  const handleExportCSV = () => {
    const headers = ['Cow ID/Tag', 'Heat Date', 'Insemination Date', 'Method', 'Sire Bull', 'Pregnancy Status', 'Expected Calving'];
    const rows = breedingRecords.map(b => {
      const cow = cows.find(c => c.id === b.cow_id);
      return [
        cow ? `${cow.name} (${cow.tag_number})` : b.cow_id,
        b.heat_date,
        b.insemination_date || 'N/A',
        b.breeding_method,
        b.bull_info,
        b.status,
        b.expected_calving_date || 'N/A'
      ];
    });
    exportToCSV('Breeding_Gestation_Records', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Cow Tag', 'Insemination Date', 'Sire Bull', 'Status', 'Expected Calving', 'Countdown'];
    const rows = breedingRecords.map(b => {
      const cow = cows.find(c => c.id === b.cow_id);
      const days = getDaysRemaining(b.expected_calving_date);
      return [
        cow ? `${cow.name} (${cow.tag_number})` : b.cow_id,
        formatDate(b.insemination_date),
        b.bull_info,
        b.status,
        formatDate(b.expected_calving_date),
        days !== null ? (days > 0 ? `${days} days` : 'Overdue/Calved') : 'N/A'
      ];
    });
    exportToPDF('HERD BREEDING & GESTATION REPORT', 'Summary of AI records and expected calving dates', headers, rows, 'Breeding_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-purple-600" /> Breeding & Gestation Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor heat cycles, artificial insemination, pregnancy confirmation & calving countdowns.
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
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Record Breeding Event
          </button>
        </div>
      </div>

      {/* Pregnant Cows Overview Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Active Gestation Monitor
          </div>
          <h3 className="text-xl font-bold">{pregnantCows.length} Cows Confirmed Pregnant</h3>
          <p className="text-xs text-purple-200 mt-0.5">
            Average gestation period is ~283 days. Prepare dry paddocks 60 days before calving.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
          <p className="text-[10px] font-bold uppercase text-purple-200">Next Expected Calving</p>
          <p className="text-base font-black text-white mt-0.5">
            {pregnantCows[0] ? formatDate(pregnantCows[0].expected_calving_date) : 'None scheduled'}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Cattle Name & Tag</th>
                <th className="p-4">Heat Date</th>
                <th className="p-4">Insemination Date</th>
                <th className="p-4">Sire / Bull Info</th>
                <th className="p-4">Pregnancy Status</th>
                <th className="p-4">Expected Calving</th>
                <th className="p-4">Gestation Countdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {breedingRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No breeding records logged yet.
                  </td>
                </tr>
              ) : (
                breedingRecords.map((b) => {
                  const cow = cows.find(c => c.id === b.cow_id);
                  const days = getDaysRemaining(b.expected_calving_date);
                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-slate-900">{cow ? cow.name : 'Unknown Cow'}</p>
                          <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold">
                            {cow ? cow.tag_number : b.cow_id}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">{formatDate(b.heat_date)}</td>
                      <td className="p-4 font-semibold text-slate-700">{formatDate(b.insemination_date)}</td>
                      <td className="p-4 font-medium text-slate-700 max-w-xs truncate">{b.bull_info || 'N/A'}</td>

                      <td className="p-4">
                        <Badge variant={b.status === 'Pregnant' ? 'purple' : b.status === 'Calved' ? 'emerald' : 'amber'}>
                          {b.status}
                        </Badge>
                      </td>

                      <td className="p-4 font-black text-purple-800">{formatDate(b.expected_calving_date)}</td>

                      <td className="p-4 font-bold">
                        {days !== null && days > 0 ? (
                          <span className="text-xs bg-purple-100 text-purple-900 px-2.5 py-1 rounded-lg">
                            ⏳ {days} days remaining
                          </span>
                        ) : days !== null && days <= 0 ? (
                          <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg">
                            🎉 Calving Due / Completed
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BreedingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addBreedingRecord}
        cows={cows}
      />
    </div>
  );
};
