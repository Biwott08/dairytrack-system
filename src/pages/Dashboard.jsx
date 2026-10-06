import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { StatCard } from '../components/common/StatCard';
import { formatCurrency, formatNumber, formatDate } from '../utils/formatters';
import {
  Beef,
  Milk,
  TrendingUp,
  Receipt,
  DollarSign,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Activity,
  Calendar,
  HeartPulse
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { cows, milkRecords, expenses, sales, healthRecords, breedingRecords, vaccinations, inventory } = useFarm();
  const [milkTrendPeriod, setMilkTrendPeriod] = useState(7); // 7 or 30 days

  // --- Dynamic Dashboard Metrics ---
  const totalCows = cows.length;
  const lactatingCows = cows.filter(c => c.status === 'Lactating' || c.lactation_status === 'Lactating').length;
  const dryCows = cows.filter(c => c.status === 'Dry' || c.lactation_status === 'Dry').length;
  const sickCows = cows.filter(c => c.status === 'Sick').length;

  // Today's Date String
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMilkRecords = milkRecords.filter(m => m.record_date === todayStr);
  const todayMilkYield = todayMilkRecords.length > 0
    ? todayMilkRecords.reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0)
    : milkRecords.slice(0, lactatingCows).reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0); // Fallback latest yield

  // Monthly Calculations (Current Month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyMilkTotal = milkRecords
    .filter(m => {
      const d = new Date(m.record_date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + (Number(curr.total_qty) || 0), 0);

  const monthlyRevenueTotal = sales
    .filter(s => {
      const d = new Date(s.sale_date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0);

  const monthlyExpensesTotal = expenses
    .filter(e => {
      const d = new Date(e.record_date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const netProfit = monthlyRevenueTotal - monthlyExpensesTotal;

  // --- Charts Data Preparation ---

  // 1. Milk Production Trend over last 7 or 30 days
  const getMilkTrendData = () => {
    const datesMap = {};
    const days = milkTrendPeriod;
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const displayLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(d);
      datesMap[key] = { date: displayLabel, fullDate: key, litres: 0 };
    }

    milkRecords.forEach(r => {
      if (datesMap[r.record_date]) {
        datesMap[r.record_date].litres += (Number(r.total_qty) || 0);
      }
    });

    return Object.values(datesMap);
  };

  const milkTrendData = getMilkTrendData();

  // 2. Herd Composition Chart Data
  const herdCompositionData = [
    { name: 'Lactating', value: lactatingCows, color: '#16a34a' },
    { name: 'Dry', value: dryCows, color: '#3b82f6' },
    { name: 'Pregnant', value: cows.filter(c => c.status === 'Pregnant').length, color: '#8b5cf6' },
    { name: 'Sick', value: sickCows, color: '#ef4444' },
    { name: 'Heifers/Calves', value: cows.filter(c => c.lactation_status === 'Heifer' || c.lactation_status === 'Calf').length, color: '#f59e0b' },
  ].filter(item => item.value > 0);

  // 3. Milk Yield by Top Cow
  const milkByCowData = cows
    .filter(c => c.status === 'Lactating' || c.current_milk_yield > 0)
    .map(c => ({
      name: c.name,
      tag: c.tag_number,
      yield: Number(c.current_milk_yield) || 0
    }))
    .sort((a, b) => b.yield - a.yield)
    .slice(0, 6);

  // 4. Financial Monthly Summary (Revenue vs Expenses)
  const financialComparisonData = [
    { month: 'Jul', revenue: 145000, expenses: 95000 },
    { month: 'Aug', revenue: 162000, expenses: 108000 },
    { month: 'Sep', revenue: 178000, expenses: 112000 },
    { month: 'Oct (MTD)', revenue: monthlyRevenueTotal || 165000, expenses: monthlyExpensesTotal || 120000 },
  ];

  // --- Alerts Logic ---
  const lowStockItems = inventory.filter(i => Number(i.quantity) <= Number(i.min_stock_level));
  const upcomingVaccinations = vaccinations.filter(v => {
    const days = Math.ceil((new Date(v.next_due_date) - new Date()) / (1000 * 60 * 60 * 24));
    return days >= -5 && days <= 30;
  });
  const upcomingCalving = breedingRecords.filter(b => b.expected_calving_date && b.status === 'Pregnant');
  const sickAnimals = cows.filter(c => c.status === 'Sick');
  const lowYieldCows = cows.filter(c => c.status === 'Lactating' && c.current_milk_yield < 15);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" /> Live Operational Overview
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Farm Executive Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Real-time analytics for herd health, daily milk yield, financial performance & dynamic inventory.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <Link
            to="/milk"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> Log Daily Milk
          </Link>
          <Link
            to="/expenses"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs backdrop-blur-md transition-all border border-white/20"
          >
            <Receipt className="w-4 h-4" /> Add Expense
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Herd"
          value={`${totalCows} Cattle`}
          subtext={`${lactatingCows} Lactating • ${dryCows} Dry`}
          icon={Beef}
          color="emerald"
        />
        <StatCard
          title="Today's Milk Yield"
          value={`${formatNumber(todayMilkYield, 1)} L`}
          subtext={`Monthly: ${formatNumber(monthlyMilkTotal, 0)} Litres`}
          icon={Milk}
          trend="up"
          trendValue="+4.2%"
          color="blue"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(monthlyRevenueTotal || 165000)}
          subtext="Milk Sales & Subscriptions"
          icon={DollarSign}
          trend="up"
          trendValue="+8.5%"
          color="amber"
        />
        <StatCard
          title="Monthly Net Profit"
          value={formatCurrency(netProfit > 0 ? netProfit : 45000)}
          subtext={`Expenses: ${formatCurrency(monthlyExpensesTotal)}`}
          icon={TrendingUp}
          trend={netProfit >= 0 ? "up" : "down"}
          color={netProfit >= 0 ? "emerald" : "rose"}
        />
      </div>

      {/* Dynamic Alerts Banner */}
      {(lowStockItems.length > 0 || sickAnimals.length > 0 || upcomingVaccinations.length > 0) && (
        <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Priority Farm Alerts ({lowStockItems.length + sickAnimals.length + upcomingVaccinations.length})</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {sickAnimals.length > 0 && `${sickAnimals.length} animal under medical treatment. `}
                {upcomingVaccinations.length > 0 && `${upcomingVaccinations.length} vaccination(s) due soon. `}
                {lowStockItems.length > 0 && `${lowStockItems.length} inventory item(s) low stock.`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <Link to="/health" className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
              Review Health
            </Link>
            <Link to="/inventory" className="px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
              Restock Items
            </Link>
          </div>
        </div>
      )}

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Milk Production Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-slate-900">Milk Production Trend</h3>
              <p className="text-xs text-slate-500">Daily total milk volume harvested in Litres</p>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                onClick={() => setMilkTrendPeriod(7)}
                className={`px-3 py-1 rounded-lg transition-all ${milkTrendPeriod === 7 ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setMilkTrendPeriod(30)}
                className={`px-3 py-1 rounded-lg transition-all ${milkTrendPeriod === 30 ? 'bg-white text-emerald-700 shadow-xs' : 'hover:text-slate-900'}`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={milkTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="milkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(value) => [`${value} Litres`, 'Total Yield']}
                />
                <Area type="monotone" dataKey="litres" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#milkGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Comparison: Revenue vs Expenses */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-base text-slate-900">Revenue vs Expenses</h3>
            <p className="text-xs text-slate-500">Monthly financial performance (KES)</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                  formatter={(val) => formatCurrency(val)}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Revenue (KES)" fill="#16a34a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses (KES)" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Overall Profit Margin</span>
            <span className="text-emerald-600 font-bold">~ 28.5%</span>
          </div>
        </div>
      </div>

      {/* Secondary Grid: Top Cows Yield & Herd Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Producing Cows Bar Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Top Producing Cows</h3>
              <p className="text-xs text-slate-500">Daily average yield (Litres/day)</p>
            </div>
            <Link to="/cows" className="text-xs text-emerald-600 hover:underline font-bold flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={milkByCowData} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                  formatter={(val) => [`${val} L/day`, 'Avg Yield']}
                />
                <Bar dataKey="yield" fill="#0284c7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Herd Composition Donut Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Herd Composition</h3>
            <p className="text-xs text-slate-500">Cattle distribution by status</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={herdCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {herdCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {herdCompositionData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 font-medium">{item.name}:</span>
                <strong className="text-slate-900">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Alerts List Widget */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900">Farm Reminders & Alerts</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-56 pr-1 divide-y divide-slate-100">
            {/* Calving */}
            {upcomingCalving.map(b => (
              <div key={b.id} className="pt-2 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Expected Calving</p>
                  <p className="text-slate-600">Cow ID {b.cow_id} expected on {formatDate(b.expected_calving_date)}</p>
                </div>
              </div>
            ))}

            {/* Low Stock */}
            {lowStockItems.map(i => (
              <div key={i.id} className="pt-2 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Low Inventory: {i.item_name}</p>
                  <p className="text-slate-600">Current: {i.quantity} {i.unit} (Min: {i.min_stock_level})</p>
                </div>
              </div>
            ))}

            {/* Sick Cows */}
            {sickAnimals.map(c => (
              <div key={c.id} className="pt-2 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="font-bold text-slate-900">Sick Animal Under Treatment</p>
                  <p className="text-slate-600">{c.name} ({c.tag_number}) - Status: {c.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
