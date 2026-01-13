
import React, { useMemo } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import { MOCK_JAMAAH, MOCK_PACKAGES } from '../constants';

const Dashboard: React.FC = () => {
  const stats = useMemo(() => ({
    totalJamaah: MOCK_JAMAAH.length,
    revenue: MOCK_JAMAAH.reduce((acc, curr) => acc + curr.totalPaid, 0),
    activePackages: MOCK_PACKAGES.length,
    pendingPayments: MOCK_JAMAAH.filter(j => j.paymentStatus !== 'PAID').length
  }), []);

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Overview Bisnis</h1>
          <p className="text-slate-500">Selamat datang kembali! Berikut adalah ringkasan performa travel hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                <Calendar size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700">12 Jan - 18 Jan 2024</span>
            </div>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                Generate Report
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Jamaah', value: stats.totalJamaah, icon: <Users />, color: 'blue', change: '+12%', trend: 'up' },
          { label: 'Total Pendapatan', value: `Rp ${(stats.revenue / 1000000).toFixed(1)}jt`, icon: <TrendingUp />, color: 'emerald', change: '+8%', trend: 'up' },
          { label: 'Paket Aktif', value: stats.activePackages, icon: <Calendar />, color: 'amber', change: '0%', trend: 'neutral' },
          { label: 'Menunggu Pembayaran', value: stats.pendingPayments, icon: <AlertCircle />, color: 'rose', change: '-2%', trend: 'down' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-${item.color}-600 bg-${item.color}-50 group-hover:scale-110 transition-transform`}>
                {/* Fix: Cast icon to React.ReactElement<any> to resolve the 'size' prop type error in cloneElement */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                item.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 
                item.trend === 'down' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {item.trend === 'up' ? <ArrowUpRight size={12} /> : item.trend === 'down' ? <ArrowDownRight size={12} /> : null}
                {item.change}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-900">Pertumbuhan Jamaah</h2>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-emerald-500">
              <option>6 Bulan Terakhir</option>
              <option>1 Tahun Terakhir</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#10b981', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Pendaftaran Terakhir</h2>
          <div className="space-y-6">
            {MOCK_JAMAAH.map((j) => (
              <div key={j.id} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {j.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{j.fullName}</p>
                  <p className="text-xs text-slate-500">{j.packageId === 'p1' ? 'Ekonomi' : 'VIP'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-400">{j.registrationDate}</p>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${
                    j.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {j.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
            <button className="w-full py-3 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Lihat Semua Jamaah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
