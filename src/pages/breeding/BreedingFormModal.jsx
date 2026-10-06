import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';
import { calculateExpectedCalvingDate } from '../../utils/formatters';

export const BreedingFormModal = ({ isOpen, onClose, onSubmit, cows }) => {
  const [formData, setFormData] = useState({
    cow_id: cows[0]?.id || '',
    heat_date: new Date().toISOString().split('T')[0],
    insemination_date: new Date().toISOString().split('T')[0],
    breeding_method: 'Artificial Insemination',
    bull_info: 'Semex WorldClass Friesian Straw #SEM-904',
    pregnancy_confirmed: true,
    status: 'Pregnant',
    notes: 'Standing heat observed. AI performed by licensed technician.'
  });

  const expectedCalving = calculateExpectedCalvingDate(formData.insemination_date);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      expected_calving_date: expectedCalving
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Breeding / Insemination Event"
      subtitle="Track heat cycles, AI straws, pregnancy confirmation & estimated calving date"
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
            <label className="block font-bold text-slate-700 mb-1">Breeding Method</label>
            <select
              name="breeding_method"
              value={formData.breeding_method}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="Artificial Insemination">Artificial Insemination (AI)</option>
              <option value="Natural Bull">Natural Serving (Bull)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Heat Detection Date *</label>
            <input
              type="date"
              name="heat_date"
              required
              value={formData.heat_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Insemination Date</label>
            <input
              type="date"
              name="insemination_date"
              value={formData.insemination_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Bull / Semen Straw Information</label>
          <input
            type="text"
            name="bull_info"
            value={formData.bull_info}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-medium"
            placeholder="e.g. Semex Friesian Straw #SEM-904"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
          <div className="space-y-2">
            <label className="block font-bold text-purple-900 mb-1">Pregnancy Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-300 rounded-xl bg-white text-sm font-bold text-purple-900"
            >
              <option value="Heat Detected">Heat Detected</option>
              <option value="Inseminated">Inseminated (Pending Test)</option>
              <option value="Pregnant">Pregnant Confirmed</option>
              <option value="Calved">Calved</option>
              <option value="Failed">Failed / Repeat Heat</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-purple-900 mb-1">Auto Expected Calving Date (+283 days)</label>
            <div className="w-full px-3 py-2 bg-purple-700 text-white rounded-xl text-sm font-black flex items-center justify-center shadow-xs">
              {expectedCalving || 'Select Insemination Date'}
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Breeding Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Ultrasound confirmed on day 45..."
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
            className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-purple-600 hover:bg-purple-500 shadow-md"
          >
            Save Breeding Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
