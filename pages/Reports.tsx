
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Calendar,
  ChevronRight,
  Loader2,
  Trophy,
  Target,
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  ArrowUpRight
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
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { generateSmartReport } from '../services/geminiService';
import { MOCK_JAMAAH, MOCK_PACKAGES } from '../constants';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  // Derive data for charts
  const revenueData = [
    { name: 'Jan', revenue: 120, target: 100 },
    { name: 'Feb', revenue: 150, target: 110 },
    { name: 'Mar', revenue: 180, target: 120 },
    { name: 'Apr', revenue: 170, target: 130 },
    { name: 'May', revenue: 210, target: 140 },
    { name: 'Jun', revenue: 250, target: 150 },
  ];

  const packagePopularity = useMemo(() => {
    return MOCK_PACKAGES.map((pkg, idx) => ({
      name: pkg.name.split(' ')[1] || pkg.name, // Shorten name
      value: MOCK_JAMAAH.filter(j => j.packageId === pkg.id).length,
      fill: idx === 0 ? '#10b981' : '#0ea5e9'
    }));
  }, []);

  const handleGenerateAIReport = async () => {
    setLoading(true);
    const summaryData = {
      jamaah: MOCK_JAMAAH.length,
      revenue: MOCK_JAMAAH.reduce((acc, curr) => acc + curr.totalPaid, 0),
      packages: MOCK_PACKAGES.map(p => ({ name: p.name, availability: p.available }))
    };
    const result = await generateSmartReport(summaryData);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta tracking-tight">Laporan & Analitik Strategis</h1>
          <p className="text-slate-500">Visualisasi performa bisnis dan proyeksi pertumbuhan travel.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 shadow-sm">
            <Calendar size={18} className="text-emerald-500" />
            Januari - Juni 2024
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Download size={18} />
            Export Full PDF
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Efisiensi Operasional', value: '92%', icon: <Target />, color: 'emerald', trend: '+5.4%' },
          { label: 'Retention Rate', value: '88%', icon: <Trophy />, color: 'amber', trend: '+2.1%' },
          { label: 'Pertumbuhan YoY', value: '24%', icon: <TrendingUp />, color: 'blue', trend: '+12%' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 -mr-8 -mt-8 rounded-full`}></div>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600`}>
                {/* Fix: Cast icon to React.ReactElement<any> to resolve the 'size' prop type error in cloneElement */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {item.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 size={20} className="text-emerald-500" />
                Tren Pendapatan Bulanan
              </h2>
              <p className="text-xs text-slate-400 mt-1">Dalam jutaan rupiah (IDR M)</p>
            </div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div> Target
              </span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '15px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Package Distribution Pie Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <PieIcon size={20} className="text-emerald-500" />
            Distribusi Paket
          </h2>
          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={packagePopularity}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {packagePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {packagePopularity.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value} Jamaah</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI & Available Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 p-8 rounded-[3rem] text-white shadow-2xl shadow-emerald-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <Sparkles className="absolute top-4 right-4 text-emerald-300 opacity-20 group-hover:rotate-12 transition-transform duration-500" size={120} />
            <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">UmrahSmart AI Insights</h3>
                <p className="text-emerald-50/80 text-sm mb-8 leading-relaxed font-medium">
                    Analisis data real-time menggunakan kecerdasan buatan untuk mengidentifikasi peluang bisnis dan optimasi layanan.
                </p>
                <button 
                  onClick={handleGenerateAIReport}
                  disabled={loading}
                  className="w-full bg-white text-emerald-700 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/10 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={18} />}
                  Mulai Analisis AI
                </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              Laporan Siap Unduh
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Laporan Laba Rugi', type: 'Finance' },
                { name: 'Manifest Keberangkatan', type: 'Ops' },
                { name: 'Analisis Kuota Hotel', type: 'Logistic' },
                { name: 'Rekapitulasi Kwitansi', type: 'Finance' }
              ].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700">{l.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{l.type}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Result Container */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm min-h-[600px] relative overflow-hidden">
          {report ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-3 text-emerald-600">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span className="font-black text-sm uppercase tracking-widest">AI EXECUTIVE SUMMARY</span>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">GENERATED ON {new Date().toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors">
                  <Download size={20} />
                </button>
              </div>
              <div className="whitespace-pre-line text-slate-700 leading-relaxed font-medium text-base space-y-4">
                {report}
              </div>
              <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 shadow-sm">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Rekomendasi Utama</p>
                  <p className="text-xs text-slate-500">Tingkatkan kuota Paket VIP sebesar 15% berdasarkan tren permintaan Syawal.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 border border-slate-100 shadow-inner">
                    <FileText size={48} />
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-800">Siap Menganalisis Data?</p>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed font-medium">
                      Gunakan kekuatan AI untuk menemukan pola tersembunyi dalam data travel Anda. Klik tombol "Mulai Analisis AI" untuk memulai.
                    </p>
                </div>
                <div className="flex gap-2 opacity-50 grayscale scale-75">
                  <div className="w-8 h-8 rounded-full bg-emerald-100"></div>
                  <div className="w-8 h-8 rounded-full bg-emerald-200"></div>
                  <div className="w-8 h-8 rounded-full bg-emerald-300"></div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
