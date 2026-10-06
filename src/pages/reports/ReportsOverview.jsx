import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { formatDate, formatCurrency, formatNumber } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import {
  FileSpreadsheet,
  Download,
  Beef,
  Milk,
  DollarSign,
  HeartPulse,
  Calendar,
  Filter,
  CheckCircle2,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ReportsOverview = () => {
  const { cows, milkRecords, expenses, sales, healthRecords, breedingRecords } = useFarm();
  
  const [activeReportTab, setActiveReportTab] = useState('financial'); // financial, herd, milk, health, breeding
  const [dateFilterDays, setDateFilterDays] = useState(0); // 0 = all, 30 = 30 days, 90 = 90 days

  // Date Filter Helper
  const filterByDate = (items, dateKey = 'record_date') => {
    if (dateFilterDays === 0) return items;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - dateFilterDays);
    return items.filter(item => {
      const dStr = item[dateKey] || item.sale_date || item.heat_date || item.administered_date;
      if (!dStr) return true;
      return new Date(dStr) >= cutoff;
    });
  };

  const filteredSales = filterByDate(sales, 'sale_date');
  const filteredExpenses = filterByDate(expenses, 'record_date');
  const filteredMilk = filterByDate(milkRecords, 'record_date');
  const filteredHealth = filterByDate(healthRecords, 'record_date');
  const filteredBreeding = filterByDate(breedingRecords, 'heat_date');

  // Financial Calculations
  const totalRevenue = filteredSales.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);
  const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;

  // Herd Calculations
  const totalHerd = cows.length;
  const lactatingCount = cows.filter(c => c.status === 'Lactating').length;
  const dryCount = cows.filter(c => c.status === 'Dry').length;
  const pregnantCount = cows.filter(c => c.status === 'Pregnant').length;

  const breedDistribution = cows.reduce((acc, curr) => {
    acc[curr.breed] = (acc[curr.breed] || 0) + 1;
    return acc;
  }, {});

  // Milk Calculations
  const totalMilkLitres = filteredMilk.reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0);
  const avgMilkPerCow = lactatingCount > 0 ? (totalMilkLitres / (filteredMilk.length || 1)).toFixed(1) : 0;

  // Exports
  const handleExportPDFReport = () => {
    if (activeReportTab === 'financial') {
      const headers = ['Financial Metric', 'Value (KES)'];
      const rows = [
        ['Total Gross Revenue (Sales)', formatCurrency(totalRevenue)],
        ['Total Operating Expenses', formatCurrency(totalExpenses)],
        ['Net Operating Profit', formatCurrency(netProfit)],
        ['Operating Profit Margin', `${profitMargin}%`]
      ];
      exportToPDF('EXECUTIVE FINANCIAL PERFORMANCE REPORT', 'Profit & Loss Statement in Kenyan Shillings (KES)', headers, rows, 'Financial_Report');
    } else if (activeReportTab === 'herd') {
      const headers = ['Tag Number', 'Name', 'Breed', 'Status', 'DOB', 'Yield (L/day)'];
      const rows = cows.map(c => [c.tag_number, c.name, c.breed, c.status, c.date_of_birth, `${c.current_milk_yield || 0} L`]);
      exportToPDF('FARM HERD & CATTLE INVENTORY REPORT', 'Comprehensive animal status and breed breakdown', headers, rows, 'Herd_Report');
    } else if (activeReportTab === 'milk') {
      const headers = ['Date', 'Cow Tag', 'Morning (L)', 'Evening (L)', 'Total Daily (L)'];
      const rows = filteredMilk.map(m => [m.record_date, m.cow_id, `${m.morning_qty} L`, `${m.evening_qty} L`, `${m.total_qty} L`]);
      exportToPDF('MILK HARVEST PRODUCTION REPORT', 'Detailed daily milk production records', headers, rows, 'Milk_Report');
    } else if (activeReportTab === 'health') {
      const headers = ['Date', 'Cow Tag', 'Diagnosis', 'Treatment', 'Cost (KES)'];
      const rows = filteredHealth.map(h => [h.record_date, h.cow_id, h.diagnosis, h.treatment, formatCurrency(h.cost)]);
      exportToPDF('VETERINARY & ANIMAL HEALTH REPORT', 'Medical cases and treatment expenditures', headers, rows, 'Health_Report');
    } else {
      const headers = ['Cow Tag', 'Insemination Date', 'Sire Bull', 'Pregnancy Status', 'Expected Calving'];
      const rows = filteredBreeding.map(b => [b.cow_id, b.insemination_date || 'N/A', b.bull_info || 'N/A', b.status, b.expected_calving_date || 'N/A']);
      exportToPDF('BREEDING & GESTATION REPORT', 'Summary of artificial inseminations and pregnancy confirmations', headers, rows, 'Breeding_Report');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-7 h-7 text-emerald-600" /> Executive Farm Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate printable academic and professional reports with PDF/CSV export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl text-xs font-semibold shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setDateFilterDays(0)}
              className={`px-2.5 py-1 rounded-lg transition-all ${dateFilterDays === 0 ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Time
            </button>
            <button
              onClick={() => setDateFilterDays(30)}
              className={`px-2.5 py-1 rounded-lg transition-all ${dateFilterDays === 30 ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setDateFilterDays(90)}
              className={`px-2.5 py-1 rounded-lg transition-all ${dateFilterDays === 90 ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Last 90 Days
            </button>
          </div>

          <button
            onClick={handleExportPDFReport}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Download className="w-4 h-4" /> Export Report (PDF)
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
        {[
          { id: 'financial', label: 'Financial Performance', icon: DollarSign },
          { id: 'herd', label: 'Herd & Breed Report', icon: Beef },
          { id: 'milk', label: 'Milk Yield Report', icon: Milk },
          { id: 'health', label: 'Health & Vet Report', icon: HeartPulse },
          { id: 'breeding', label: 'Breeding & Gestation', icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveReportTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all shrink-0 ${
              activeReportTab === tab.id
                ? 'border-emerald-600 text-emerald-700 font-extrabold bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Financial Report Tab */}
      {activeReportTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-400 uppercase">Gross Revenue</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">{formatCurrency(totalRevenue)}</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-400 uppercase">Total Expenses</p>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{formatCurrency(totalExpenses)}</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <p className="text-xs font-bold text-slate-400 uppercase">Net Operating Profit</p>
              <h3 className={`text-2xl font-black mt-1 ${netProfit >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {formatCurrency(netProfit)}
              </h3>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl text-white shadow-xs">
              <p className="text-xs font-bold text-slate-400 uppercase">Profit Margin %</p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1">{profitMargin}%</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Profit & Loss Summary Breakdown</h3>
            <table className="w-full text-left text-xs">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-emerald-50/50 font-bold">
                  <td className="p-3">Total Milk Sales Revenue</td>
                  <td className="p-3 text-right text-emerald-700">{formatCurrency(totalRevenue)}</td>
                </tr>
                <tr>
                  <td className="p-3 pl-6">Feed & Concentrates Expense</td>
                  <td className="p-3 text-right text-slate-700">
                    {formatCurrency(filteredExpenses.filter(e => e.category === 'Feed').reduce((a, b) => a + Number(b.amount), 0))}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-6">Veterinary & Medication Expense</td>
                  <td className="p-3 text-right text-slate-700">
                    {formatCurrency(filteredExpenses.filter(e => e.category === 'Veterinary' || e.category === 'Medication').reduce((a, b) => a + Number(b.amount), 0))}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-6">Labour Salaries & Wages</td>
                  <td className="p-3 text-right text-slate-700">
                    {formatCurrency(filteredExpenses.filter(e => e.category === 'Labour').reduce((a, b) => a + Number(b.amount), 0))}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 pl-6">Utilities & Transport</td>
                  <td className="p-3 text-right text-slate-700">
                    {formatCurrency(filteredExpenses.filter(e => e.category === 'Utilities' || e.category === 'Transport').reduce((a, b) => a + Number(b.amount), 0))}
                  </td>
                </tr>
                <tr className="bg-slate-900 text-white font-black">
                  <td className="p-3">NET BOTTOM-LINE PROFIT (KES)</td>
                  <td className="p-3 text-right text-emerald-400">{formatCurrency(netProfit)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Herd Report Tab */}
      {activeReportTab === 'herd' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400">TOTAL HERD</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalHerd} Head</h3>
            </div>
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800">LACTATING</p>
              <h3 className="text-2xl font-black text-emerald-900 mt-1">{lactatingCount} Cows</h3>
            </div>
            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200">
              <p className="text-xs font-bold text-sky-800">DRY PERIOD</p>
              <h3 className="text-2xl font-black text-sky-900 mt-1">{dryCount} Cows</h3>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <p className="text-xs font-bold text-purple-800">PREGNANT</p>
              <h3 className="text-2xl font-black text-purple-900 mt-1">{pregnantCount} Cows</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Breed Distribution Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {Object.entries(breedDistribution).map(([breed, count]) => (
                <div key={breed} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="font-semibold text-slate-700">{breed}</span>
                  <strong className="text-slate-900 font-extrabold">{count} head</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Milk Report Tab */}
      {activeReportTab === 'milk' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Milk Harvest Analytics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-slate-500 font-bold uppercase">Total Harvest Volume</p>
              <h4 className="text-xl font-black text-slate-900 mt-1">{totalMilkLitres} Litres</h4>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-emerald-800 font-bold uppercase">Average Yield / Cow</p>
              <h4 className="text-xl font-black text-emerald-900 mt-1">{avgMilkPerCow} L / day</h4>
            </div>
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
              <p className="text-sky-800 font-bold uppercase">Total Harvest Sessions</p>
              <h4 className="text-xl font-black text-sky-900 mt-1">{filteredMilk.length} Sessions</h4>
            </div>
          </div>
        </div>
      )}

      {/* Health Report Tab */}
      {activeReportTab === 'health' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Clinical Health & Veterinary Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-bold uppercase text-slate-600 border-b">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">Treatment & Medication</th>
                  <th className="p-3">Vet</th>
                  <th className="p-3">Cost (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHealth.map(h => (
                  <tr key={h.id}>
                    <td className="p-3 font-semibold">{formatDate(h.record_date)}</td>
                    <td className="p-3 font-bold text-slate-900">{h.diagnosis}</td>
                    <td className="p-3 text-slate-600">{h.treatment} ({h.medication})</td>
                    <td className="p-3">{h.veterinarian || 'N/A'}</td>
                    <td className="p-3 font-bold text-rose-600">{formatCurrency(h.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Breeding Report Tab */}
      {activeReportTab === 'breeding' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Breeding & Gestation Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-bold uppercase text-slate-600 border-b">
                <tr>
                  <th className="p-3">Insemination Date</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Sire Bull Info</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Expected Calving</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBreeding.map(b => (
                  <tr key={b.id}>
                    <td className="p-3 font-semibold">{formatDate(b.insemination_date)}</td>
                    <td className="p-3">{b.breeding_method}</td>
                    <td className="p-3 text-slate-700">{b.bull_info}</td>
                    <td className="p-3"><Badge variant="purple">{b.status}</Badge></td>
                    <td className="p-3 font-bold text-purple-800">{formatDate(b.expected_calving_date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
