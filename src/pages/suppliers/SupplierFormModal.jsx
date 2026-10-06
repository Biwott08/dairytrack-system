import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const SupplierFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: 'Highland Feeds Ltd',
    contact_person: 'Peter Njuguna',
    phone: '+254 722 555 777',
    email: 'sales@highlandfeeds.co.ke',
    location: 'Eldoret Industrial Area',
    products_supplied: 'Dairy Meal 24%, Maize Germ, Wheat Bran',
    notes: 'Primary feed supplier'
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
      title="Add Supplier Account"
      subtitle="Register feed mills, agrovet distributors and equipment vendors"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company / Supplier Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              placeholder="e.g. VetCare Kenya Ltd"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Dr. Anne Kiprop"
            />
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
              placeholder="+254 711 222 333"
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
              placeholder="sales@supplier.co.ke"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Location / City</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Nakuru Town"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Products Supplied</label>
          <input
            type="text"
            name="products_supplied"
            value={formData.products_supplied}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Vaccines, AI Straws, Milking Spare Parts"
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
            Save Supplier
          </button>
        </div>
      </form>
    </Modal>
  );
};
