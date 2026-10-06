import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { InventoryFormModal } from './InventoryFormModal';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Package, Plus, Download, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const InventoryList = () => {
  const { suppliers, inventory, addInventoryItem } = useFarm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lowStockItems = inventory.filter(i => Number(i.quantity) <= Number(i.min_stock_level));

  const handleExportCSV = () => {
    const headers = ['Item Name', 'Category', 'Quantity', 'Unit', 'Purchase Price (KES)', 'Min Threshold', 'Expiry Date'];
    const rows = inventory.map(i => [
      i.item_name,
      i.category,
      i.quantity,
      i.unit,
      i.purchase_price,
      i.min_stock_level,
      i.expiry_date || 'N/A'
    ]);
    exportToCSV('Farm_Inventory_Stock', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Item Name', 'Category', 'Stock Level', 'Unit Price', 'Min Level', 'Status'];
    const rows = inventory.map(i => {
      const isLow = Number(i.quantity) <= Number(i.min_stock_level);
      return [
        i.item_name,
        i.category,
        `${i.quantity} ${i.unit}`,
        formatCurrency(i.purchase_price),
        `${i.min_stock_level} ${i.unit}`,
        isLow ? 'LOW STOCK' : 'Adequate'
      ];
    });
    exportToPDF('FARM INVENTORY STOCK REPORT', 'Current stock levels and low inventory alert thresholds', headers, rows, 'Inventory_Report');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-7 h-7 text-emerald-600" /> Farm Inventory & Stock Module
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track feed bags, vet drugs, milking equipment and automatic reorder thresholds.
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
            <Download className="w-3.5 h-3.5" /> PDF Stock
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Add Inventory Item
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-amber-900">Low Stock Reorder Alerts ({lowStockItems.length} items)</p>
              <p className="text-amber-800">
                {lowStockItems.map(i => `${i.item_name} (${i.quantity} ${i.unit})`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Min Threshold</th>
                <th className="p-4">Unit Price (KES)</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Stock Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No inventory items added yet.
                  </td>
                </tr>
              ) : (
                inventory.map((item) => {
                  const isLow = Number(item.quantity) <= Number(item.min_stock_level);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-black text-slate-900">{item.item_name}</td>
                      <td className="p-4">
                        <Badge variant="sky">{item.category}</Badge>
                      </td>
                      <td className="p-4 font-extrabold text-slate-800 text-sm">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-4 font-semibold text-slate-500">{item.min_stock_level} {item.unit}</td>
                      <td className="p-4 font-semibold text-slate-800">{formatCurrency(item.purchase_price)}</td>
                      <td className="p-4 text-slate-600">{item.expiry_date ? formatDate(item.expiry_date) : 'N/A'}</td>
                      <td className="p-4">
                        <Badge variant={isLow ? 'rose' : 'emerald'}>
                          {isLow ? '⚠️ LOW STOCK' : 'In Stock'}
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

      <InventoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addInventoryItem}
        suppliers={suppliers}
      />
    </div>
  );
};
