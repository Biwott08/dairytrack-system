import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { SupplierFormModal } from './SupplierFormModal';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Truck, Plus, Download, Phone, Mail, MapPin, PackageCheck } from 'lucide-react';

export const SuppliersList = () => {
  const { suppliers, inventory, addSupplier } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSupplierInventoryCount = (supplierId) => {
    return inventory.filter(i => i.supplier_id === supplierId).length;
  };

  const handleExportCSV = () => {
    const headers = ['Supplier Name', 'Contact Person', 'Phone', 'Email', 'Location', 'Products Supplied'];
    const rows = suppliers.map(s => [
      s.name,
      s.contact_person || '',
      s.phone,
      s.email || '',
      s.location || '',
      s.products_supplied || ''
    ]);
    exportToCSV('Farm_Suppliers_Directory', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Supplier Name', 'Contact Person', 'Phone', 'Location', 'Products Supplied'];
    const rows = suppliers.map(s => [
      s.name,
      s.contact_person || 'N/A',
      s.phone,
      s.location || 'N/A',
      s.products_supplied || 'N/A'
    ]);
    exportToPDF('FARM VENDOR & SUPPLIER DIRECTORY', 'Approved farm input suppliers and service vendors', headers, rows, 'Supplier_Directory');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Truck className="w-7 h-7 text-emerald-600" /> Supplier & Vendor Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage feed millers, agrovet distributors, equipment suppliers and service vendors.
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
            <Plus className="w-4 h-4" /> Add Supplier
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((s) => {
          const itemCount = getSupplierInventoryCount(s.id);
          return (
            <div key={s.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{s.name}</h3>
                  <p className="text-xs font-medium text-emerald-700">Contact: {s.contact_person || 'Representative'}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm border border-slate-200">
                  <Truck className="w-5 h-5 text-emerald-600" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{s.phone}</span>
                </div>
                {s.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.email}</span>
                  </div>
                )}
                {s.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase mb-1">Products Supplied</p>
                <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200">
                  {s.products_supplied || 'General farm inputs'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                  <PackageCheck className="w-3.5 h-3.5" /> {itemCount} active inventory items
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <SupplierFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addSupplier}
      />
    </div>
  );
};
