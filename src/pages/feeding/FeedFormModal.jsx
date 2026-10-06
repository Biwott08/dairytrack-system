import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const FeedFormModal = ({ isOpen, onClose, onSubmit, cows }) => {
  const [formData, setFormData] = useState({
    cow_id: '',
    feed_type: 'Dairy Meal 24%',
    quantity: 100,
    unit: 'kg',
    cost: 4800,
    record_date: new Date().toISOString().split('T')[0],
    group_target: 'Lactating Herd',
    notes: 'Morning and evening milking feed ration.'
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
      cost: Number(formData.cost) || 0
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Feed Consumption"
      subtitle="Track fodder, concentrates and mineral supplement costs"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Feed Type *</label>
            <select
              name="feed_type"
              value={formData.feed_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Napier Grass">Napier Grass (Chopped Green Fodder)</option>
              <option value="Dairy Meal 24%">Dairy Meal 24% Commercial Concentrate</option>
              <option value="Maize Silage">Maize Silage</option>
              <option value="Boma Rhodes Hay">Boma Rhodes Hay Bales</option>
              <option value="Maize Germ">Maize Germ / Wheat Bran</option>
              <option value="Mineral Supplements">Mineral Salt Lick Blocks</option>
              <option value="Lucerne / Desmodium">Lucerne / Desmodium Protein Legumes</option>
              <option value="Other Feeds">Other Feeds</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Group / Cow</label>
            <select
              name="group_target"
              value={formData.group_target}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="Lactating Herd">Lactating Herd (Milking Cows)</option>
              <option value="Dry Cows">Dry Cows</option>
              <option value="Heifers & Calves">Heifers & Calves</option>
              <option value="All Herd">All Herd (Whole Farm)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Quantity *</label>
            <input
              type="number"
              step="0.1"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Unit of Measure</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="bales">Bales</option>
              <option value="bags">Bags (50kg)</option>
              <option value="litres">Litres</option>
              <option value="tonnes">Tonnes</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Total Feed Cost (KES) *</label>
            <input
              type="number"
              name="cost"
              required
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-emerald-700"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Record Date</label>
          <input
            type="date"
            name="record_date"
            value={formData.record_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Mixing ratios or supplier source..."
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
            Save Feed Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
