import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const ExpenseFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    record_date: new Date().toISOString().split('T')[0],
    category: 'Feed',
    description: 'Purchase of Dairy Meal concentrates',
    amount: 15000,
    payment_method: 'M-Pesa',
    notes: 'Paybill receipt #MP89201'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: Number(formData.amount) || 0
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Farm Operating Expense"
      subtitle="Track expenses by category for net profit calculation"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Expense Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Feed">Feed (Fodder & Concentrates)</option>
              <option value="Veterinary">Veterinary Visits & Consultation</option>
              <option value="Medication">Medication & Vaccines</option>
              <option value="Labour">Labour & Farm Staff Salaries</option>
              <option value="Transport">Transport & Fuel</option>
              <option value="Equipment">Equipment Maintenance & Spare Parts</option>
              <option value="Utilities">Utilities (Electricity, Water Tokens)</option>
              <option value="Breeding">Breeding (AI Straws & Technician Fees)</option>
              <option value="Other">Other Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Expense Date *</label>
            <input
              type="date"
              name="record_date"
              required
              value={formData.record_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Description / Item *</label>
          <input
            type="text"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
            placeholder="e.g. Purchase 10 bags Dairy Meal"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Amount (KES) *</label>
            <input
              type="number"
              name="amount"
              required
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-rose-600"
              placeholder="15000"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="M-Pesa">M-Pesa</option>
              <option value="Bank Transfer">Bank Transfer (EFT / RTGS)</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notes / Receipt Reference</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="e.g. Invoice #9021"
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
            className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-500 shadow-md"
          >
            Save Operating Expense
          </button>
        </div>
      </form>
    </Modal>
  );
};
