import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { SaleFormModal } from './SaleFormModal';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { TrendingUp, Plus, Download, AlertCircle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const SalesList = () => {
  const { customers, sales, addSale } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSalesRevenue = sales.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);
  const totalLitresSold = sales.reduce((acc, curr) => acc + (Number(curr.quantity_litres) || 0), 0);
  const pendingSales = sales.filter(s => s.payment_status === 'Pending');
  const pendingAmount = pendingSales.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);

  const handleExportCSV = () => {
    const headers = ['Date', 'Customer', 'Litres Sold', 'Price/Litre (KES)', 'Total Amount (KES)', 'Payment Status', 'Payment Method'];
    const rows = sales.map(s => {
      const cust = customers.find(c => c.id === s.customer_id);
      return [
        s.sale_date,
        cust ? cust.name : s.customer_id,
        s.quantity_litres,
        s.price_per_litre,
        s.total_amount,
        s.payment_status,
        s.payment_method
      ];
    });
    exportToCSV('Milk_Sales_Revenue_Log', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Date', 'Customer Name', 'Litres', 'Rate (KES)', 'Total Revenue', 'Status'];
    const rows = sales.map(s => {
      const cust = customers.find(c => c.id === s.customer_id);
      return [
        formatDate(s.sale_date),
        cust ? cust.name : s.customer_id,
        `${s.quantity_litres} L`,
        `KES ${s.price_per_litre}`,
        formatCurrency(s.total_amount),
        s.payment_status
      ];
    });
    exportToPDF('MILK SALES & REVENUE REPORT', 'Summary of milk commercial transactions and customer billing', headers, rows, 'Sales_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-emerald-600" /> Milk Sales & Commercial Revenue
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log milk commercial dispatches, price per litre, customer invoices and payment statuses.
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
            <Plus className="w-4 h-4" /> Record Milk Sale
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Accumulated Revenue</p>
          <h3 className="text-2xl font-black text-emerald-700 mt-1">{formatCurrency(totalSalesRevenue)}</h3>
          <p className="text-xs text-slate-500 mt-1">{totalLitresSold} Litres commercially dispatched</p>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-xs">
          <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase mb-1">
            <AlertCircle className="w-4 h-4" /> Outstanding Unpaid Invoices
          </div>
          <h3 className="text-2xl font-black text-amber-950">{formatCurrency(pendingAmount)}</h3>
          <p className="text-xs text-amber-800 font-semibold mt-0.5">{pendingSales.length} invoice(s) pending clearance</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl text-white shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Average Realized Milk Price</p>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">KES 71.50 / Litre</h3>
          <p className="text-xs text-slate-300 mt-1">Bulk co-op & retail hotel pricing mix</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Sale Date</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Quantity Sold</th>
                <th className="p-4">Price / Litre</th>
                <th className="p-4">Total Amount (KES)</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No milk sales recorded yet.
                  </td>
                </tr>
              ) : (
                sales.map((s) => {
                  const cust = customers.find(c => c.id === s.customer_id);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{formatDate(s.sale_date)}</td>
                      <td className="p-4 font-black text-slate-900">{cust ? cust.name : 'Walk-in Customer'}</td>
                      <td className="p-4 font-bold text-sky-700">{s.quantity_litres} Litres</td>
                      <td className="p-4 font-semibold text-slate-700">KES {s.price_per_litre}</td>
                      <td className="p-4 font-black text-emerald-700 text-sm">
                        {formatCurrency(s.total_amount || (s.quantity_litres * s.price_per_litre))}
                      </td>
                      <td className="p-4 font-medium text-slate-700">{s.payment_method}</td>
                      <td className="p-4">
                        <Badge variant={s.payment_status === 'Paid' ? 'emerald' : 'amber'}>
                          {s.payment_status}
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

      <SaleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addSale}
        customers={customers}
      />
    </div>
  );
};
