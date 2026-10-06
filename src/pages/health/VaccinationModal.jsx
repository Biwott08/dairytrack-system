import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const VaccinationModal = ({ isOpen, onClose, onSubmit, cows }) => {
  const [formData, setFormData] = useState({
    cow_id: cows[0]?.id || '',
    vaccine_name: 'Foot and Mouth Disease (FMD)',
    administered_date: new Date().toISOString().split('T')[0],
    next_due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    cost: 850,
    veterinarian: 'Dr. John Omondi',
    notes: 'Bi-annual FMD booster shot.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      cost: Number(formData.cost) || 0
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Herd Vaccination Record"
      subtitle="Track vaccine brand, administration date and next booster due date"
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
                  {c.name} ({c.tag_number}) - {c.breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Vaccine Name / Disease *</label>
            <select
              name="vaccine_name"
              value={formData.vaccine_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Foot and Mouth Disease (FMD)">Foot and Mouth Disease (FMD)</option>
              <option value="Lumpy Skin Disease (LSD)">Lumpy Skin Disease (LSD)</option>
              <option value="Anthrax & Blackquarter">Anthrax & Blackquarter (Blanthrax)</option>
              <option value="East Coast Fever (ECF) ITM">East Coast Fever (ECF) ITM</option>
              <option value="Brucellosis S19">Brucellosis S19</option>
              <option value="Rift Valley Fever">Rift Valley Fever (RVF)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Administered Date *</label>
            <input
              type="date"
              name="administered_date"
              required
              value={formData.administered_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Next Booster Due Date *</label>
            <input
              type="date"
              name="next_due_date"
              required
              value={formData.next_due_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-emerald-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Vaccine Cost (KES)</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="850"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Veterinarian</label>
            <input
              type="text"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Dr. John Omondi"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Batch number #4902-A..."
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
            Save Vaccination Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
