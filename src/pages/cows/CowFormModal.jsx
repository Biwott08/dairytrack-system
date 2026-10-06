import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const CowFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    tag_number: '',
    name: '',
    breed: 'Friesian',
    gender: 'Female',
    date_of_birth: '',
    weight: '',
    color: '',
    purchase_date: '',
    purchase_price: '',
    status: 'Lactating',
    lactation_status: 'Lactating',
    current_milk_yield: '',
    father: '',
    mother: '',
    notes: '',
    photo_url: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        weight: initialData.weight || '',
        purchase_price: initialData.purchase_price || '',
        current_milk_yield: initialData.current_milk_yield || ''
      });
    } else {
      setFormData({
        tag_number: `KEF-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        breed: 'Friesian',
        gender: 'Female',
        date_of_birth: new Date().toISOString().split('T')[0],
        weight: 500,
        color: 'Black & White',
        purchase_date: new Date().toISOString().split('T')[0],
        purchase_price: 140000,
        status: 'Lactating',
        lactation_status: 'Lactating',
        current_milk_yield: 22,
        father: '',
        mother: '',
        notes: '',
        photo_url: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80'
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      weight: Number(formData.weight) || 0,
      purchase_price: Number(formData.purchase_price) || 0,
      current_milk_yield: Number(formData.current_milk_yield) || 0
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Cattle Record" : "Register New Cow / Cattle"}
      subtitle="Fill in all physical identification and lactation details"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tag Number / Ear Tag *</label>
            <input
              type="text"
              name="tag_number"
              required
              value={formData.tag_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              placeholder="e.g. KEF-109"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Cow Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
              placeholder="e.g. Daisy"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Breed *</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-semibold"
            >
              <option value="Friesian">Friesian</option>
              <option value="Ayrshire">Ayrshire</option>
              <option value="Jersey">Jersey</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Crossbred">Crossbred</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              name="date_of_birth"
              required
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Weight (Kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="e.g. 520"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Color / Markings</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Black & White"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="Lactating">Lactating</option>
              <option value="Dry">Dry</option>
              <option value="Pregnant">Pregnant</option>
              <option value="Sick">Sick</option>
              <option value="Sold">Sold</option>
              <option value="Deceased">Deceased</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Lactation Stage</label>
            <select
              name="lactation_status"
              value={formData.lactation_status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            >
              <option value="Lactating">Lactating</option>
              <option value="Dry">Dry</option>
              <option value="Heifer">Heifer</option>
              <option value="Calf">Calf</option>
              <option value="N/A">N/A</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Avg Daily Yield (L/day)</label>
            <input
              type="number"
              step="0.1"
              name="current_milk_yield"
              value={formData.current_milk_yield}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm font-bold text-emerald-600"
              placeholder="25.0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Purchase Price (KES)</label>
            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="150000"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Sire / Father Bull</label>
            <input
              type="text"
              name="father"
              value={formData.father}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Semex AI Sire"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dam / Mother Cow</label>
            <input
              type="text"
              name="mother"
              value={formData.mother}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
              placeholder="Bella"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block font-bold text-slate-700">Cow Photo (Image File or URL)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer text-slate-600 transition-colors">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Upload Photo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <input
                type="text"
                name="photo_url"
                value={formData.photo_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-xs"
                placeholder="Or paste image URL (https://...)"
              />
            </div>
          </div>
          {formData.photo_url && (
            <div className="flex items-center gap-2 pt-1">
              <img src={formData.photo_url} alt="Preview" className="w-10 h-10 rounded-lg object-cover border" />
              <span className="text-[11px] text-emerald-600 font-medium">Image loaded successfully</span>
            </div>
          )}
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Additional Notes</label>
          <textarea
            name="notes"
            rows="2"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-xl bg-slate-50 focus:bg-white text-sm"
            placeholder="Temperament, specific dietary needs or past medical highlights..."
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
            {initialData ? 'Update Cattle Record' : 'Save Cattle Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
