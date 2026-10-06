import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const SaleFormModal = ({ isOpen, onClose, onSubmit, customers }) => {
  const [formData, setFormData] = useState({
    customer_id: customers[0]?.id || '',
    sale_date: new Date().toISOString().split('T')[0],
    quantity_litres: 50,
    price_per_litre: 70,
    payment_status: 'Paid',
    payment_method: 'M-Pesa',
    notes: 'Fresh morning milk delivery'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatedTotal = (Number(formData.quantity_litres) || 0) * (Number(formData.price_per_litre) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity_litres: Number(formData.quantity_litres) || 0,
      price_per_litre: Number(formData.price_per_litre) || 0,
      total_amount: calculatedTotal
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Milk Sale & Revenue"
      subtitle="Automatically calculates Total Amount = Quantity × Price per Litre"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Customer / Buyer *</label>
            <select
              name="customer_id"
              required
              value={formData.customer_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.customer_type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sale Date *</label>
            <input
              type="date"
              name="sale_date"
              required
              value={formData.sale_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Quantity Sold (Litres) *</label>
            <input
              type="number"
              step="0.5"
              name="quantity_litres"
              required
              value={formData.quantity_litres}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-sm font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Price per Litre (KES) *</label>
            <input
              type="number"
              name="price_per_litre"
              required
              value={formData.price_per_litre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-sm font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Total Calculated Revenue</label>
            <div className="w-full px-3 py-2 bg-emerald-700 text-white rounded-xl text-sm font-black flex items-center justify-center shadow-xs">
              KES {calculatedTotal.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
            <select
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Paid">Paid in Full</option>
              <option value="Pending">Pending / Unpaid Invoice</option>
              <option value="Partial">Partial Payment</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="M-Pesa">M-Pesa</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit Contract</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notes / Delivery Ticket</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Delivery note #7810..."
          />
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
            Save Milk Sale Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
