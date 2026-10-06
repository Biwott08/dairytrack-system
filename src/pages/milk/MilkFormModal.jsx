import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const MilkFormModal = ({ isOpen, onClose, onSubmit, cows }) => {
  const lactatingCows = cows.filter(c => c.status === 'Lactating' || c.lactation_status === 'Lactating');
  
  const [formData, setFormData] = useState({
    cow_id: lactatingCows[0]?.id || cows[0]?.id || '',
    record_date: new Date().toISOString().split('T')[0],
    morning_qty: 14.5,
    evening_qty: 11.0,
    milk_quality: 'Grade A',
    notes: 'Normal morning & evening milking harvest.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalQty = (Number(formData.morning_qty) || 0) + (Number(formData.evening_qty) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      morning_qty: Number(formData.morning_qty) || 0,
      evening_qty: Number(formData.evening_qty) || 0,
      total_qty: totalQty
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Daily Milk Production"
      subtitle="Log morning and evening milk quantities per cow"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Cow *</label>
            <select
              name="cow_id"
              required
              value={formData.cow_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
            >
              {cows.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.tag_number}) - {c.breed} [{c.status}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Harvest Date *</label>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Morning Yield (Litres)</label>
            <input
              type="number"
              step="0.1"
              name="morning_qty"
              required
              value={formData.morning_qty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-sm font-bold text-sky-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Evening Yield (Litres)</label>
            <input
              type="number"
              step="0.1"
              name="evening_qty"
              required
              value={formData.evening_qty}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-sm font-bold text-amber-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Calculated Total (L)</label>
            <div className="w-full px-3 py-2 bg-emerald-600 text-white rounded-xl text-sm font-black flex items-center justify-center shadow-xs">
              {totalQty.toFixed(1)} Litres
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Milk Quality Grade</label>
          <select
            name="milk_quality"
            value={formData.milk_quality}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
          >
            <option value="Grade A">Grade A (Premium Butterfat & Low Bacterial Count)</option>
            <option value="Grade B">Grade B (Standard Processed Milk)</option>
            <option value="Rejected">Rejected (High SCC / Antibiotic Residue)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notes / Milker Comments</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="e.g. Udder washed, full letdown observed."
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
            Save Production Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
