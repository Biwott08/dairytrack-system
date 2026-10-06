import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { CustomerFormModal } from './CustomerFormModal';
import { formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Users, Plus, Download, Phone, Mail, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const CustomersList = () => {
  const { customers, sales, addCustomer } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCustomerStats = (custId) => {
    const custSales = sales.filter(s => s.customer_id === custId);
    const totalSpent = custSales.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);
    const totalLitres = custSales.reduce((acc, curr) => acc + (Number(curr.quantity_litres) || 0), 0);
    return { count: custSales.length, totalSpent, totalLitres };
  };

  const handleExportCSV = () => {
    const headers = ['Customer Name', 'Category', 'Phone', 'Email', 'Location', 'Notes'];
    const rows = customers.map(c => [
      c.name,
      c.customer_type,
      c.phone,
      c.email || '',
      c.location || '',
      c.notes || ''
    ]);
    exportToCSV('Farm_Customer_Directory', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Customer Name', 'Type', 'Phone Number', 'Location', 'Total Purchased'];
    const rows = customers.map(c => {
      const stats = getCustomerStats(c.id);
      return [
        c.name,
        c.customer_type,
        c.phone,
        c.location || 'N/A',
        formatCurrency(stats.totalSpent)
      ];
    });
    exportToPDF('FARM CUSTOMER DIRECTORY & SALES HISTORY', 'List of registered buyers and total expenditure', headers, rows, 'Customer_Directory');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-600" /> Customer Management Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage buyer directory (Hotels, Schools, Cooperatives, Retail shops & Individuals).
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
            <Download className="w-3.5 h-3.5" /> PDF Directory
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Add Customer
          </button>
        </div>
      </div>

      {/* Customers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c) => {
          const stats = getCustomerStats(c.id);
          return (
            <div key={c.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{c.name}</h3>
                  <Badge variant="emerald">{c.customer_type}</Badge>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
                  {c.name.charAt(0)}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{c.phone}</span>
                </div>
                {c.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.email}</span>
                  </div>
                )}
                {c.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{c.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Volume Purchased</p>
                  <p className="font-bold text-slate-900">{stats.totalLitres} L</p>
                </div>
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200 text-center">
                  <p className="text-[10px] font-bold text-emerald-700 uppercase">Total Revenue</p>
                  <p className="font-extrabold text-emerald-800">{formatCurrency(stats.totalSpent)}</p>
                </div>
              </div>

              {c.notes && (
                <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100 truncate">
                  "{c.notes}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addCustomer}
      />
    </div>
  );
};
