import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { Badge } from '../../components/common/Badge';
import { CowFormModal } from './CowFormModal';
import { calculateAge, formatCurrency } from '../../utils/formatters';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Plus, Search, Filter, Eye, Edit2, Trash2, Download, Beef, Milk, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CowsList = () => {
  const { cows, addCow, updateCow, deleteCow } = useFarm();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('tag');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCow, setEditingCow] = useState(null);

  // Filter & Search Logic
  const filteredCows = cows.filter(cow => {
    const matchesSearch =
      cow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cow.tag_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cow.breed.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBreed = selectedBreed === 'All' || cow.breed === selectedBreed;
    const matchesStatus = selectedStatus === 'All' || cow.status === selectedStatus;

    return matchesSearch && matchesBreed && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'yield') return (b.current_milk_yield || 0) - (a.current_milk_yield || 0);
    if (sortBy === 'age') return new Date(a.date_of_birth) - new Date(b.date_of_birth);
    return a.tag_number.localeCompare(b.tag_number);
  });

  const handleOpenAdd = () => {
    setEditingCow(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cow) => {
    setEditingCow(cow);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingCow) {
      await updateCow(editingCow.id, formData);
    } else {
      await addCow(formData);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Tag Number', 'Name', 'Breed', 'Status', 'DOB', 'Weight (kg)', 'Avg Milk Yield (L)', 'Purchase Price (KES)'];
    const rows = filteredCows.map(c => [
      c.tag_number,
      c.name,
      c.breed,
      c.status,
      c.date_of_birth,
      c.weight,
      c.current_milk_yield,
      c.purchase_price
    ]);
    exportToCSV('Herd_Cattle_Report', headers, rows);
  };

  const handleExportPDF = () => {
    const headers = ['Tag #', 'Name', 'Breed', 'Status', 'Age', 'Yield (L)', 'Price (KES)'];
    const rows = filteredCows.map(c => [
      c.tag_number,
      c.name,
      c.breed,
      c.status,
      calculateAge(c.date_of_birth),
      `${c.current_milk_yield || 0} L`,
      formatCurrency(c.purchase_price)
    ]);
    exportToPDF('HERD CATTLE INVENTORY REPORT', 'Complete listing of active farm cattle and lactation status', headers, rows, 'Herd_Report');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Lactating': return <Badge variant="emerald">Lactating</Badge>;
      case 'Dry': return <Badge variant="sky">Dry</Badge>;
      case 'Pregnant': return <Badge variant="purple">Pregnant</Badge>;
      case 'Sick': return <Badge variant="rose">Sick</Badge>;
      case 'Sold': return <Badge variant="amber">Sold</Badge>;
      default: return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Beef className="w-7 h-7 text-emerald-600" /> Cattle & Herd Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Total {cows.length} cattle registered • {filteredCows.length} matching active filters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> PDF Report
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-4 h-4" /> Add Cattle
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by tag, name or breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-500">Breed:</span>
            <select
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
            >
              <option value="All">All Breeds</option>
              <option value="Friesian">Friesian</option>
              <option value="Ayrshire">Ayrshire</option>
              <option value="Jersey">Jersey</option>
              <option value="Guernsey">Guernsey</option>
              <option value="Crossbred">Crossbred</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Lactating">Lactating</option>
              <option value="Dry">Dry</option>
              <option value="Pregnant">Pregnant</option>
              <option value="Sick">Sick</option>
              <option value="Sold">Sold</option>
              <option value="Deceased">Deceased</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium"
            >
              <option value="tag">Tag Number</option>
              <option value="name">Cow Name</option>
              <option value="yield">Daily Milk Yield</option>
              <option value="age">Age</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cattle Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Cattle Tag & Name</th>
                <th className="p-4">Breed</th>
                <th className="p-4">Status</th>
                <th className="p-4">Age / DOB</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Avg Milk Yield</th>
                <th className="p-4">Purchase Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCows.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-slate-400">
                    No cattle matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredCows.map((cow) => (
                  <tr key={cow.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cow.photo_url || "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80"}
                          alt={cow.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{cow.name}</p>
                          <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {cow.tag_number}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-slate-700">{cow.breed}</td>
                    <td className="p-4">{getStatusBadge(cow.status)}</td>
                    <td className="p-4 text-slate-600">{calculateAge(cow.date_of_birth)}</td>
                    <td className="p-4 font-medium text-slate-700">{cow.weight ? `${cow.weight} kg` : 'N/A'}</td>

                    <td className="p-4 font-bold text-slate-900">
                      {cow.status === 'Lactating' ? (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Milk className="w-3.5 h-3.5" /> {cow.current_milk_yield || 0} L/day
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">0.0 L</span>
                      )}
                    </td>

                    <td className="p-4 font-semibold text-slate-700">{formatCurrency(cow.purchase_price)}</td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/cows/${cow.id}`}
                          className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Full Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(cow)}
                          className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Edit Cow"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCow(cow.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CowFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCow}
      />
    </div>
  );
};
