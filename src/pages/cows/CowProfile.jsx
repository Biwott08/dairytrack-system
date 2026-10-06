import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFarm } from '../../context/FarmContext';
import { calculateAge, formatCurrency, formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import {
  ArrowLeft,
  Milk,
  HeartPulse,
  Calendar,
  Wheat,
  DollarSign,
  Beef,
  Activity,
  UserCheck,
  Tag
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CowProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cows, milkRecords, healthRecords, breedingRecords, feedRecords, vaccinations } = useFarm();

  const [activeTab, setActiveTab] = useState('overview');

  const cow = cows.find(c => String(c.id) === String(id));

  if (!cow) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 my-8">
        <h3 className="text-lg font-bold text-slate-900">Cow Record Not Found</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">The cow record you requested does not exist or was deleted.</p>
        <button
          onClick={() => navigate('/cows')}
          className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
        >
          Return to Herd List
        </button>
      </div>
    );
  }

  // Filter records related to this specific cow
  const cowMilk = milkRecords.filter(m => String(m.cow_id) === String(cow.id));
  const cowHealth = healthRecords.filter(h => String(h.cow_id) === String(cow.id));
  const cowBreeding = breedingRecords.filter(b => String(b.cow_id) === String(cow.id));
  const cowVaccinations = vaccinations.filter(v => String(v.cow_id) === String(cow.id));
  const cowFeeding = feedRecords.filter(f => String(f.cow_id) === String(cow.id) || f.group_target === 'Lactating Herd');

  // Total calculations
  const totalMilkLitres = cowMilk.reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0);
  const estimatedMilkRevenue = totalMilkLitres * 70; // 70 KES / Litre average
  const totalHealthExpenses = cowHealth.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);

  // Milk Chart Data
  const milkChartData = cowMilk
    .slice(0, 14)
    .reverse()
    .map(m => ({
      date: formatDate(m.record_date),
      morning: Number(m.morning_qty) || 0,
      evening: Number(m.evening_qty) || 0,
      total: Number(m.total_qty) || 0
    }));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/cows"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Herd Listing
        </Link>
        <span className="text-xs text-slate-400">Cow Profile ID: {cow.id}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={cow.photo_url || "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=500&q=80"}
            alt={cow.name}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">{cow.name}</h1>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                {cow.tag_number}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{cow.breed}</span> • <span>{calculateAge(cow.date_of_birth)}</span> • <span>{cow.gender}</span>
            </div>
            <div className="pt-1 flex items-center gap-2">
              <Badge variant={cow.status === 'Lactating' ? 'emerald' : cow.status === 'Sick' ? 'rose' : 'sky'}>
                {cow.status}
              </Badge>
              {cow.current_milk_yield > 0 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  ⚡ Avg {cow.current_milk_yield} L/day
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Milk Harvested</p>
            <p className="text-lg font-black text-slate-900">{totalMilkLitres} L</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
            <p className="text-[10px] font-bold text-emerald-700 uppercase">Est. Milk Value</p>
            <p className="text-lg font-black text-emerald-800">{formatCurrency(estimatedMilkRevenue)}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: 'Basic Info & Physical', icon: Beef },
          { id: 'milk', label: 'Milk Production', icon: Milk },
          { id: 'health', label: 'Health & Vaccinations', icon: HeartPulse },
          { id: 'breeding', label: 'Breeding & Gestation', icon: Calendar },
          { id: 'feeding', label: 'Feeding Log', icon: Wheat },
          { id: 'finance', label: 'Financial Summary', icon: DollarSign },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all shrink-0 ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-700 font-extrabold bg-emerald-50/50'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview & Physical Info */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Identification & Physical Attributes</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Tag Number</p>
                <p className="font-bold text-slate-800">{cow.tag_number}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Name</p>
                <p className="font-bold text-slate-800">{cow.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Breed</p>
                <p className="font-bold text-slate-800">{cow.breed}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Gender</p>
                <p className="font-bold text-slate-800">{cow.gender}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Date of Birth</p>
                <p className="font-bold text-slate-800">{formatDate(cow.date_of_birth)}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Weight</p>
                <p className="font-bold text-slate-800">{cow.weight ? `${cow.weight} kg` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Color / Markings</p>
                <p className="font-bold text-slate-800">{cow.color || 'Standard'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Current Status</p>
                <p className="font-bold text-slate-800">{cow.status}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Lineage & Acquisition</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Father (Sire)</p>
                <p className="font-bold text-slate-800">{cow.father || 'AI Straw Sire'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Mother (Dam)</p>
                <p className="font-bold text-slate-800">{cow.mother || 'On-farm Dam'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Purchase Date</p>
                <p className="font-bold text-slate-800">{formatDate(cow.purchase_date)}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Purchase Cost</p>
                <p className="font-bold text-slate-800">{formatCurrency(cow.purchase_price)}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-400 mb-1">Farmer Notes</p>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                "{cow.notes || 'No specific notes recorded for this animal.'}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Milk Production */}
      {activeTab === 'milk' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-4">Production History Chart (Recent Harvests)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={milkChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="morning" name="Morning (L)" stroke="#0284c7" strokeWidth={2} />
                  <Line type="monotone" dataKey="evening" name="Evening (L)" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="total" name="Total Daily (L)" stroke="#16a34a" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 font-bold uppercase text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Morning (L)</th>
                  <th className="p-3.5">Evening (L)</th>
                  <th className="p-3.5">Total Yield</th>
                  <th className="p-3.5">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cowMilk.length === 0 ? (
                  <tr><td colSpan="5" className="p-6 text-center text-slate-400">No milk records logged for {cow.name}.</td></tr>
                ) : (
                  cowMilk.map(m => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-semibold text-slate-800">{formatDate(m.record_date)}</td>
                      <td className="p-3.5 text-sky-700 font-medium">{m.morning_qty} L</td>
                      <td className="p-3.5 text-amber-700 font-medium">{m.evening_qty} L</td>
                      <td className="p-3.5 font-bold text-emerald-700">{m.total_qty} L</td>
                      <td className="p-3.5"><Badge variant="emerald">{m.milk_quality || 'Grade A'}</Badge></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Health & Vaccinations */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-4">Medical Diagnosis & Treatment Log</h3>
            <div className="space-y-4">
              {cowHealth.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No medical diagnoses recorded for this cow.</p>
              ) : (
                cowHealth.map(h => (
                  <div key={h.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm">{h.diagnosis}</h4>
                      <Badge variant={h.recovery_status === 'Recovered' ? 'emerald' : 'rose'}>{h.recovery_status}</Badge>
                    </div>
                    <p className="text-slate-600"><strong>Symptoms:</strong> {h.symptoms}</p>
                    <p className="text-slate-600"><strong>Treatment:</strong> {h.treatment} ({h.medication} - {h.dosage})</p>
                    <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200">
                      <span>Vet: {h.veterinarian} • Date: {formatDate(h.record_date)}</span>
                      <strong className="text-slate-800">Cost: {formatCurrency(h.cost)}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-4">Vaccination Records</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {cowVaccinations.length === 0 ? (
                <p className="text-slate-500 italic">No vaccination logs.</p>
              ) : (
                cowVaccinations.map(v => (
                  <div key={v.id} className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
                    <h5 className="font-bold text-emerald-900">{v.vaccine_name}</h5>
                    <p className="text-slate-600">Administered: {formatDate(v.administered_date)}</p>
                    <p className="text-emerald-700 font-semibold">Next Due: {formatDate(v.next_due_date)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Breeding & Gestation */}
      {activeTab === 'breeding' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4 text-xs">
          <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Gestation & Breeding Records</h3>
          {cowBreeding.length === 0 ? (
            <p className="text-slate-500 italic">No breeding history logged for {cow.name}.</p>
          ) : (
            cowBreeding.map(b => (
              <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">Breeding Event - {b.breeding_method}</span>
                  <Badge variant={b.pregnancy_confirmed ? 'purple' : 'amber'}>{b.status}</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
                  <div><span className="text-slate-400">Heat Date:</span> <br/>{formatDate(b.heat_date)}</div>
                  <div><span className="text-slate-400">Insemination:</span> <br/>{formatDate(b.insemination_date)}</div>
                  <div><span className="text-slate-400">Sire / Bull Info:</span> <br/>{b.bull_info}</div>
                  <div><span className="text-slate-400">Exp. Calving:</span> <br/><strong className="text-purple-700">{formatDate(b.expected_calving_date)}</strong></div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 5: Feeding */}
      {activeTab === 'feeding' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 text-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900">Feed Allocation Log</h3>
          <div className="space-y-2">
            {cowFeeding.map(f => (
              <div key={f.id} className="p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">{f.feed_type}</p>
                  <p className="text-slate-500">{f.group_target} • {f.quantity} {f.unit}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-700">{formatCurrency(f.cost)}</p>
                  <p className="text-slate-400 text-[10px]">{formatDate(f.record_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Financial Summary */}
      {activeTab === 'finance' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6">
          <h3 className="font-bold text-base text-slate-900">Individual Cattle P&L Statement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <p className="text-slate-500 font-semibold">Purchase Price</p>
              <h4 className="text-lg font-bold text-slate-900 mt-1">{formatCurrency(cow.purchase_price)}</h4>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <p className="text-rose-700 font-semibold">Direct Medical & Vet Costs</p>
              <h4 className="text-lg font-bold text-rose-800 mt-1">{formatCurrency(totalHealthExpenses)}</h4>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="text-emerald-700 font-semibold">Estimated Gross Milk Revenue</p>
              <h4 className="text-lg font-bold text-emerald-800 mt-1">{formatCurrency(estimatedMilkRevenue)}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
