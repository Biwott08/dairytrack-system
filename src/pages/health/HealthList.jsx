import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { HealthFormModal } from './HealthFormModal';
import { VaccinationModal } from './VaccinationModal';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Badge } from '../../components/common/Badge';
import { Activity, Plus, Download, Syringe, Stethoscope, AlertTriangle } from 'lucide-react';

export const HealthList = () => {
  const { cows, healthRecords, vaccinations, addHealthRecord, addVaccination } = useFarm();
  
  const [activeTab, setActiveTab] = useState('treatments'); // treatments or vaccinations
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isVacModalOpen, setIsVacModalOpen] = useState(false);

  const sickCows = cows.filter(c => c.status === 'Sick');
  const totalVetExpenses = healthRecords.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);

  const handleExportHealthCSV = () => {
    const headers = ['Date', 'Cow Tag', 'Diagnosis', 'Symptoms', 'Treatment', 'Medication', 'Vet', 'Cost (KES)', 'Recovery Status'];
    const rows = healthRecords.map(h => {
      const cow = cows.find(c => c.id === h.cow_id);
      return [
        h.record_date,
        cow ? `${cow.name} (${cow.tag_number})` : h.cow_id,
        h.diagnosis,
        h.symptoms,
        h.treatment,
        h.medication,
        h.veterinarian,
        h.cost,
        h.recovery_status
      ];
    });
    exportToCSV('Health_Treatments_Report', headers, rows);
  };

  const handleExportHealthPDF = () => {
    const headers = ['Date', 'Cow Tag', 'Diagnosis', 'Medication', 'Vet', 'Cost', 'Status'];
    const rows = healthRecords.map(h => {
      const cow = cows.find(c => c.id === h.cow_id);
      return [
        formatDate(h.record_date),
        cow ? `${cow.name} (${cow.tag_number})` : h.cow_id,
        h.diagnosis,
        h.medication,
        h.veterinarian,
        formatCurrency(h.cost),
        h.recovery_status
      ];
    });
    exportToPDF('ANIMAL HEALTH & VETERINARY TREATMENT REPORT', 'Complete clinical diagnoses and treatment expenditure', headers, rows, 'Health_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Activity className="w-7 h-7 text-rose-600" /> Animal Health & Veterinary Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log clinical diagnoses, veterinary treatments, medical costs and vaccination boosters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportHealthCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button
            onClick={handleExportHealthPDF}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> PDF Report
          </button>
          <button
            onClick={() => setIsHealthModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Log Treatment
          </button>
          <button
            onClick={() => setIsVacModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Syringe className="w-4 h-4" /> Log Vaccination
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Clinical Logged Cases</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{healthRecords.length} Cases</h3>
          <p className="text-xs text-slate-500 mt-1">Total Vet Spend: {formatCurrency(totalVetExpenses)}</p>
        </div>

        <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-1">
            <AlertTriangle className="w-4 h-4" /> Sick Animals Under Care
          </div>
          <h3 className="text-2xl font-black text-rose-950">{sickCows.length} Animals</h3>
          <p className="text-xs text-rose-700 font-semibold mt-0.5">Isolated milk withholding enforced</p>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-1">
            <Syringe className="w-4 h-4" /> Vaccination Logged Count
          </div>
          <h3 className="text-2xl font-black text-emerald-950">{vaccinations.length} Boosters</h3>
          <p className="text-xs text-emerald-700 font-semibold mt-0.5">Herd disease protection active</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
        <button
          onClick={() => setActiveTab('treatments')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
            activeTab === 'treatments'
              ? 'border-rose-600 text-rose-700 font-extrabold bg-rose-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Medical Treatments & Diagnoses ({healthRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vaccinations')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
            activeTab === 'vaccinations'
              ? 'border-emerald-600 text-emerald-700 font-extrabold bg-emerald-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>Vaccination Schedules ({vaccinations.length})</span>
        </button>
      </div>

      {/* Tab 1: Treatments Table */}
      {activeTab === 'treatments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Cattle Name & Tag</th>
                  <th className="p-4">Diagnosis / Symptoms</th>
                  <th className="p-4">Treatment & Dosage</th>
                  <th className="p-4">Veterinarian</th>
                  <th className="p-4">Cost (KES)</th>
                  <th className="p-4">Recovery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {healthRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-400">
                      No health treatment records logged.
                    </td>
                  </tr>
                ) : (
                  healthRecords.map((h) => {
                    const cow = cows.find(c => c.id === h.cow_id);
                    return (
                      <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold text-slate-800">{formatDate(h.record_date)}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-slate-900">{cow ? cow.name : 'Unknown Cow'}</p>
                            <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-bold">
                              {cow ? cow.tag_number : h.cow_id}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-slate-900">{h.diagnosis}</p>
                          <p className="text-slate-500 text-[11px] max-w-xs truncate">{h.symptoms}</p>
                        </td>

                        <td className="p-4">
                          <p className="font-semibold text-slate-800">{h.treatment}</p>
                          <p className="text-slate-500 text-[11px]">{h.medication} ({h.dosage})</p>
                        </td>

                        <td className="p-4 text-slate-700 font-medium">{h.veterinarian || 'N/A'}</td>
                        <td className="p-4 font-bold text-slate-900">{formatCurrency(h.cost)}</td>

                        <td className="p-4">
                          <Badge variant={h.recovery_status === 'Recovered' ? 'emerald' : 'rose'}>
                            {h.recovery_status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Vaccinations Table */}
      {activeTab === 'vaccinations' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Cattle Name & Tag</th>
                  <th className="p-4">Vaccine Name</th>
                  <th className="p-4">Administered Date</th>
                  <th className="p-4">Next Booster Due</th>
                  <th className="p-4">Veterinarian</th>
                  <th className="p-4">Cost (KES)</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vaccinations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-400">
                      No vaccination logs recorded.
                    </td>
                  </tr>
                ) : (
                  vaccinations.map((v) => {
                    const cow = cows.find(c => c.id === v.cow_id);
                    return (
                      <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-slate-900">{cow ? cow.name : 'Unknown Cow'}</p>
                            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                              {cow ? cow.tag_number : v.cow_id}
                            </span>
                          </div>
                        </td>

                        <td className="p-4 font-extrabold text-slate-900">{v.vaccine_name}</td>
                        <td className="p-4 font-medium text-slate-700">{formatDate(v.administered_date)}</td>
                        <td className="p-4 font-black text-emerald-700">{formatDate(v.next_due_date)}</td>
                        <td className="p-4 text-slate-700">{v.veterinarian || 'N/A'}</td>
                        <td className="p-4 font-semibold text-slate-800">{formatCurrency(v.cost)}</td>
                        <td className="p-4 text-slate-500 italic max-w-xs truncate">{v.notes || '—'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <HealthFormModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        onSubmit={addHealthRecord}
        cows={cows}
      />

      <VaccinationModal
        isOpen={isVacModalOpen}
        onClose={() => setIsVacModalOpen(false)}
        onSubmit={addVaccination}
        cows={cows}
      />
    </div>
  );
};
