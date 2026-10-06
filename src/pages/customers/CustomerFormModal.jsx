import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const CustomerFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: 'Naivasha Country Club Hotel',
    phone: '+254 733 444 555',
    email: 'procurement@countryclub.co.ke',
    location: 'Moi South Lake Road, Naivasha',
    customer_type: 'Hotel',
    notes: 'Premium grade A fresh milk daily delivery contract'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Customer Profile"
      subtitle="Register milk commercial buyer accounts and contract details"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Customer / Organization Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              placeholder="e.g. New KCC Naivasha"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Customer Category *</label>
            <select
              name="customer_type"
              value={formData.customer_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold"
            >
              <option value="Individual">Individual Household</option>
              <option value="Hotel">Hotel / Restaurant</option>
              <option value="School">School / Institution</option>
              <option value="Shop">Retail Dairy Shop / Kiosk</option>
              <option value="Cooperative">Dairy Cooperative / Processor</option>
              <option value="Other">Other Category</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="+254 712 345 678"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="buyer@domain.co.ke"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Physical Location / Town</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Naivasha Industrial Area"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Contract / Delivery Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="50L daily delivery schedule..."
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
            Save Customer Profile
          </button>
        </div>
      </form>
    </Modal>
  );
};
