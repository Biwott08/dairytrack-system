import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const HealthFormModal = ({ isOpen, onClose, onSubmit, cows }) => {
  const [formData, setFormData] = useState({
    cow_id: cows[0]?.id || '',
    record_date: new Date().toISOString().split('T')[0],
    diagnosis: 'Mild Mastitis',
    symptoms: 'Swollen rear udder quarter, clotted milk, temperature 39.5°C',
    treatment: 'Intramammary antibiotic infusion & anti-inflammatory injection',
    medication: 'Spectramast LC & Flunixin',
    dosage: '1 tube q12h x 3 days',
    veterinarian: 'Dr. John Omondi (DVM)',
    cost: 3500,
    recovery_status: 'Under Treatment',
    notes: 'Milk withheld from main bulk tank during treatment.'
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
      title="Record Animal Health Diagnosis & Treatment"
      subtitle="Log medical symptoms, vet prescriptions and treatment cost in KES"
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
            <label className="block font-bold text-slate-700 mb-1">Diagnosis Date *</label>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Diagnosis / Disease *</label>
            <input
              type="text"
              name="diagnosis"
              required
              value={formData.diagnosis}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
              placeholder="e.g. Clinical Mastitis, Foot Rot, Anaplasmosis"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Recovery Status</label>
            <select
              name="recovery_status"
              value={formData.recovery_status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Under Treatment">Under Treatment (Flag Cow as Sick)</option>
              <option value="Recovered">Recovered (Fully Cured)</option>
              <option value="Chronic">Chronic Case</option>
              <option value="Fatal">Fatal / Euthanized</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Symptoms Observed</label>
          <input
            type="text"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Swollen udder, high fever, loss of appetite..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Treatment Description</label>
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Intramammary flush & injection"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Medication Administered</label>
            <input
              type="text"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Spectramast LC"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="1 tube q12h x 3 days"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Attending Veterinarian</label>
            <input
              type="text"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Dr. John Omondi (DVM)"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Treatment Cost (KES)</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-rose-600"
              placeholder="3500"
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
            className="px-5 py-2 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-500 shadow-md"
          >
            Save Medical Diagnosis
          </button>
        </div>
      </form>
    </Modal>
  );
};
