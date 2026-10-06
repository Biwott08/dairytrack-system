import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const InventoryFormModal = ({ isOpen, onClose, onSubmit, suppliers }) => {
  const [formData, setFormData] = useState({
    supplier_id: suppliers[0]?.id || '',
    item_name: 'DeLaval Teat Cup Liners',
    category: 'Milking Equipment',
    quantity: 12,
    unit: 'pcs',
    purchase_price: 1200,
    purchase_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    min_stock_level: 5,
    notes: 'Grade 304 food contact silicone'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity: Number(formData.quantity) || 0,
      purchase_price: Number(formData.purchase_price) || 0,
      min_stock_level: Number(formData.min_stock_level) || 0
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Inventory Item"
      subtitle="Track farm equipment, feed bags, vet drugs and minimum safety stock"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Item Name *</label>
            <input
              type="text"
              name="item_name"
              required
              value={formData.item_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              placeholder="e.g. Spectramast LC Tubes"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Veterinary Drugs">Veterinary Drugs</option>
              <option value="Feed">Feed</option>
              <option value="Milking Equipment">Milking Equipment</option>
              <option value="Cleaning Supplies">Cleaning Supplies</option>
              <option value="Farm Tools">Farm Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Stock Qty *</label>
            <input
              type="number"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Unit of Measure</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="pcs / bags / litres"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Min Safety Threshold *</label>
            <input
              type="number"
              name="min_stock_level"
              required
              value={formData.min_stock_level}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-amber-700"
              placeholder="5"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Unit Purchase Price (KES)</label>
            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="1200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Supplier</label>
            <select
              name="supplier_id"
              value={formData.supplier_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="">No Supplier Assigned</option>
              {suppliers.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Expiry Date (If applicable)</label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-md"
          >
            Save Inventory Item
          </button>
        </div>
      </form>
    </Modal>
  );
};
