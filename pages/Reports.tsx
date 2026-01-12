
import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Calendar,
  ChevronRight,
  Loader2,
  Trophy,
  Target,
  BarChart3
} from 'lucide-react';
import { generateSmartReport } from '../services/geminiService';
import { MOCK_JAMAAH, MOCK_PACKAGES } from '../constants';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

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
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Laporan & Analitik</h1>
          <p className="text-slate-500">Monitor performa keuangan dan operasional travel Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar size={18} />
            Januari 2024
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Target Penjualan', value: '75%', icon: <Target className="text-emerald-500" />, color: 'emerald' },
          { label: 'Kepuasan Jamaah', value: '4.9/5', icon: <Trophy className="text-amber-500" />, color: 'amber' },
          { label: 'Market Share', value: '12%', icon: <BarChart3 className="text-blue-500" />, color: 'blue' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 flex items-center justify-center`}>
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <h3 className="text-xl font-bold text-slate-900">{item.value}</h3>
              </div>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-${item.color}-500`} style={{ width: item.value.includes('%') ? item.value : '90%' }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-200 overflow-hidden relative">
            <Sparkles className="absolute top-4 right-4 text-emerald-300 opacity-30" size={60} />
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">UmrahSmart AI</h3>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                    Dapatkan wawasan bisnis mendalam yang dihasilkan oleh kecerdasan buatan berbasis data jamaah Anda.
                </p>
                <button 
                  onClick={handleGenerateAIReport}
                  disabled={loading}
                  className="w-full bg-white text-emerald-700 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={18} />}
                  Generate AI Insight
                </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4">Laporan Tersedia</h4>
            <div className="space-y-3">
              {['Laporan Laba Rugi', 'Laporan Operasional', 'Daftar Manifest Pesawat', 'Kwitansi Pembayaran'].map((l, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400 group-hover:text-emerald-500" />
                    <span className="text-sm font-medium text-slate-700">{l}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm min-h-[500px]">
          {report ? (
            <div className="prose prose-slate max-w-none">
              <div className="flex items-center gap-2 text-emerald-600 mb-6">
                <Sparkles size={20} />
                <span className="font-bold text-sm uppercase tracking-widest">AI Generated Insight</span>
              </div>
              <div className="whitespace-pre-line text-slate-700 leading-relaxed font-medium">
                {report}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                    <FileText size={40} />
                </div>
                <div>
                    <p className="font-bold text-slate-400">Belum Ada Laporan AI</p>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">Klik tombol 'Generate AI Insight' di sebelah kiri untuk menganalisis data Anda.</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
