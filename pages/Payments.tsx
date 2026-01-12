
import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Plus,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { MOCK_TRANSACTIONS, MOCK_JAMAAH } from '../constants';
import { PaymentMethod } from '../types';

const Payments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'SUCCESS' | 'PENDING'>('ALL');

  const stats = [
    { label: 'Total Transaksi', value: 'Rp 47.000.000', icon: <ArrowUpRight />, color: 'emerald', trend: '+12%' },
    { label: 'Menunggu Konfirmasi', value: 'Rp 9.000.000', icon: <Clock />, color: 'amber', trend: '3 Transaksi' },
    { label: 'Gagal', value: '0', icon: <XCircle />, color: 'rose', trend: '0%' },
  ];

  const getMethodBadge = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.GATEWAY:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600"><Smartphone size={12} /> GATEWAY</span>;
      case PaymentMethod.CASH:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600"><CreditCard size={12} /> CASH</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-600"><Clock size={12} /> INSTALLMENT</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta tracking-tight">Keuangan & Pembayaran</h1>
          <p className="text-slate-500">Monitoring cash flow, cicilan jamaah, dan integrasi payment gateway.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 font-bold text-xs border border-emerald-100">
                <ShieldCheck size={14} />
                PCI-DSS Compliance Active
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200">
                <Plus size={18} />
                Transaksi Baru
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-emerald-500 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-600 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full bg-${s.color}-50 text-${s.color}-600`}>
                {s.trend}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400">{s.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{s.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              {(['ALL', 'SUCCESS', 'PENDING'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab === 'ALL' ? 'Semua Riwayat' : tab === 'SUCCESS' ? 'Berhasil' : 'Menunggu'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="ID Transaksi atau Nama..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64"
                />
              </div>
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaksi & Tanggal</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jamaah</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nominal</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metode</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSACTIONS.map((tx) => {
                const jamaah = MOCK_JAMAAH.find(j => j.id === tx.jamaahId);
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{tx.id}</span>
                        <span className="text-[10px] font-medium text-slate-400">{tx.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {jamaah?.fullName.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{jamaah?.fullName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-slate-900">Rp {tx.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6">
                      {getMethodBadge(tx.method)}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        tx.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 
                        tx.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {tx.status === 'SUCCESS' ? <CheckCircle2 size={12} /> : tx.status === 'PENDING' ? <Clock size={12} /> : <XCircle size={12} />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-slate-50 flex items-center justify-center border-t border-slate-100">
            <button className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
                Muat Lebih Banyak Riwayat
            </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
