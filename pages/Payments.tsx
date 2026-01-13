
import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Plus,
  ShieldCheck,
  Smartphone,
  Edit3,
  Trash2,
  X,
  Check,
  AlertTriangle,
  Receipt,
  User,
  Calendar
} from 'lucide-react';
import { MOCK_TRANSACTIONS, MOCK_JAMAAH } from '../constants';
import { PaymentMethod, Transaction } from '../types';

const Payments: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'ALL' | 'SUCCESS' | 'PENDING'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentTx, setCurrentTx] = useState<Partial<Transaction> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const stats = [
    { 
      label: 'Total Transaksi', 
      value: `Rp ${transactions.filter(t => t.status === 'SUCCESS').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, 
      icon: <ArrowUpRight />, 
      color: 'emerald', 
      trend: '+12%' 
    },
    { 
      label: 'Menunggu Konfirmasi', 
      value: `Rp ${transactions.filter(t => t.status === 'PENDING').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, 
      icon: <Clock />, 
      color: 'amber', 
      trend: `${transactions.filter(t => t.status === 'PENDING').length} Transaksi` 
    },
    { 
      label: 'Gagal', 
      value: transactions.filter(t => t.status === 'FAILED').length.toString(), 
      icon: <XCircle />, 
      color: 'rose', 
      trend: '0%' 
    },
  ];

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'ALL') return true;
    return tx.status === activeTab;
  });

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

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentTx({
      id: `TX-${Date.now().toString().slice(-6)}`,
      jamaahId: MOCK_JAMAAH[0].id,
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      method: PaymentMethod.CASH,
      status: 'SUCCESS',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tx: Transaction) => {
    setModalMode('edit');
    setCurrentTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTx?.jamaahId || !currentTx?.amount) return;

    if (modalMode === 'add') {
      setTransactions([currentTx as Transaction, ...transactions]);
    } else {
      setTransactions(transactions.map(t => t.id === currentTx.id ? (currentTx as Transaction) : t));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
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
            <button 
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 group"
            >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                Transaksi Baru
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-emerald-500 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 flex items-center justify-center text-${s.color}-600 group-hover:scale-110 transition-transform`}>
                {/* Fix: Cast icon to React.ReactElement<any> to resolve the 'size' prop type error in cloneElement */}
                {React.cloneElement(s.icon as React.ReactElement<any>, { size: 24 })}
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
              {filteredTransactions.map((tx) => {
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
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => handleOpenEdit(tx)}
                          className="p-2 hover:bg-white text-slate-400 hover:text-emerald-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(tx.id)}
                          className="p-2 hover:bg-white text-slate-400 hover:text-rose-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 max-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Hapus Transaksi?</h3>
            <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">Tindakan ini akan menghapus catatan transaksi secara permanen dan mempengaruhi saldo jamaah.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 py-3 bg-rose-600 text-white rounded-2xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-lg my-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Receipt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-jakarta">
                    {modalMode === 'add' ? 'Catat Transaksi Baru' : 'Edit Detail Transaksi'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Input pembayaran dari jamaah secara manual.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <User size={12} /> Pilih Jamaah
                  </label>
                  <select 
                    required
                    value={currentTx?.jamaahId}
                    onChange={(e) => setCurrentTx({...currentTx, jamaahId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                  >
                    {MOCK_JAMAAH.map(j => (
                      <option key={j.id} value={j.id}>{j.fullName} ({j.passportNumber})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      ID Transaksi
                    </label>
                    <input 
                      disabled
                      type="text" 
                      value={currentTx?.id || ''}
                      className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm text-slate-500 cursor-not-allowed font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Calendar size={12} /> Tanggal
                    </label>
                    <input 
                      required
                      type="date" 
                      value={currentTx?.date || ''}
                      onChange={(e) => setCurrentTx({...currentTx, date: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    Nominal Pembayaran (IDR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">Rp</span>
                    <input 
                      required
                      type="number" 
                      value={currentTx?.amount || ''}
                      onChange={(e) => setCurrentTx({...currentTx, amount: parseInt(e.target.value) || 0})}
                      placeholder="0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      Metode
                    </label>
                    <select 
                      value={currentTx?.method}
                      onChange={(e) => setCurrentTx({...currentTx, method: e.target.value as PaymentMethod})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                    >
                      <option value={PaymentMethod.CASH}>CASH (Tunai)</option>
                      <option value={PaymentMethod.INSTALLMENT}>CICILAN</option>
                      <option value={PaymentMethod.GATEWAY}>GATEWAY (QRIS/VA)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      Status
                    </label>
                    <select 
                      value={currentTx?.status}
                      onChange={(e) => setCurrentTx({...currentTx, status: e.target.value as any})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                    >
                      <option value="SUCCESS">BERHASIL</option>
                      <option value="PENDING">MENUNGGU</option>
                      <option value="FAILED">GAGAL</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Keterangan / Memo</label>
                  <textarea 
                    rows={2}
                    value={currentTx?.description || ''}
                    onChange={(e) => setCurrentTx({...currentTx, description: e.target.value})}
                    placeholder="Contoh: Cicilan ke-2 untuk Paket Ramadhan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  {modalMode === 'add' ? 'Simpan Transaksi' : 'Perbarui Transaksi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
