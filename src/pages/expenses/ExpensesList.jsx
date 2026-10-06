import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { ExpenseFormModal } from './ExpenseFormModal';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Receipt, Plus, Download, Trash2, DollarSign } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ExpensesList = () => {
  const { expenses, addExpense, deleteExpense } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(e => e.category === selectedCategory);

  const totalExpensesAmount = filteredExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  // Category summary calculation
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  const handleExportCSV = () => {
    const headers = ['Date', 'Category', 'Description', 'Amount (KES)', 'Payment Method', 'Notes'];
    const rows = filteredExpenses.map(e => [
      e.record_date,
      e.category,
      e.description,
      e.amount,
      e.payment_method,
      e.notes || ''
    ]);
    exportToCSV('Farm_Expenses_Log', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Date', 'Category', 'Description', 'Method', 'Amount (KES)'];
    const rows = filteredExpenses.map(e => [
      formatDate(e.record_date),
      e.category,
      e.description,
      e.payment_method,
      formatCurrency(e.amount)
    ]);
    exportToPDF('FARM OPERATING EXPENSE REPORT', 'Detailed breakdown of all farm expenditures', headers, rows, 'Expenses_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Receipt className="w-7 h-7 text-rose-600" /> Expense Management Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track farm operating expenses across Feed, Vet, Labour, Utilities and Equipment.
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
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Add Expense Record
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-1 sm:col-span-2">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Expenses ({selectedCategory})</p>
          <h3 className="text-3xl font-black text-rose-600 mt-1">{formatCurrency(totalExpensesAmount)}</h3>
          <p className="text-xs text-slate-500 mt-1">{filteredExpenses.length} expense transactions recorded</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs col-span-1 sm:col-span-2 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Top Expense Categories</p>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(categoryTotals).slice(0, 4).map(([cat, amount]) => (
              <div key={cat} className="bg-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-2">
                <span className="font-semibold text-slate-700">{cat}:</span>
                <strong className="text-slate-900">{formatCurrency(amount)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Expense Records</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Category Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Feed">Feed</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Medication">Medication</option>
              <option value="Labour">Labour</option>
              <option value="Transport">Transport</option>
              <option value="Equipment">Equipment</option>
              <option value="Utilities">Utilities</option>
              <option value="Breeding">Breeding</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description / Item</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount (KES)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400">
                    No expense records found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{formatDate(e.record_date)}</td>
                    <td className="p-4">
                      <Badge variant="rose">{e.category}</Badge>
                    </td>
                    <td className="p-4 font-semibold text-slate-900">{e.description}</td>
                    <td className="p-4 text-slate-700 font-medium">{e.payment_method}</td>
                    <td className="p-4 font-black text-rose-600 text-sm">{formatCurrency(e.amount)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteExpense(e.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addExpense}
      />
    </div>
  );
};
