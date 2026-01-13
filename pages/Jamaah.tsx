
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Upload,
  UserCheck,
  CreditCard,
  Edit3,
  Trash2,
  X,
  Check,
  AlertTriangle,
  User,
  Phone,
  BookOpen,
  MapPin,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { MOCK_JAMAAH, MOCK_PACKAGES } from '../constants';
import { PaymentStatus, Jamaah } from '../types';

const JamaahPage: React.FC = () => {
  const [jamaahList, setJamaahList] = useState<Jamaah[]>(MOCK_JAMAAH);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentJamaah, setCurrentJamaah] = useState<Partial<Jamaah> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredJamaah = jamaahList.filter(j => 
    j.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.passportNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentJamaah({
      fullName: '',
      passportNumber: '',
      phone: '',
      address: '',
      packageId: MOCK_PACKAGES[0].id,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      totalPaid: 0,
      paymentStatus: PaymentStatus.PENDING
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (jamaah: Jamaah) => {
    setModalMode('edit');
    setCurrentJamaah(jamaah);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setJamaahList(jamaahList.filter(j => j.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJamaah?.fullName || !currentJamaah?.passportNumber) return;

    if (modalMode === 'add') {
      const newJamaah: Jamaah = {
        ...(currentJamaah as Jamaah),
        id: `j${Date.now()}`,
      };
      setJamaahList([...jamaahList, newJamaah]);
    } else {
      setJamaahList(jamaahList.map(j => j.id === currentJamaah.id ? (currentJamaah as Jamaah) : j));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Data Jamaah</h1>
          <p className="text-slate-500">Manajemen pendaftaran dan administrasi jamaah Umroh.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Upload size={18} />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            <Plus size={18} />
            Jamaah Baru
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau nomor paspor..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-200">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jamaah</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Paspor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Paket</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pembayaran</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredJamaah.map((j) => {
                const pkg = MOCK_PACKAGES.find(p => p.id === j.packageId);
                const progress = (j.totalPaid / (pkg?.price || 1)) * 100;

                return (
                  <tr key={j.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                          {j.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{j.fullName}</p>
                          <p className="text-xs text-slate-500">{j.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600 font-mono">{j.passportNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700">{pkg?.name || 'Paket tidak ditemukan'}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-black text-slate-400">
                        <UserCheck size={10} />
                        {j.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400">Rp {j.totalPaid.toLocaleString()}</span>
                          <span className={`text-[10px] font-bold ${
                            j.paymentStatus === PaymentStatus.PAID ? 'text-emerald-600' : 'text-amber-600'
                          }`}>{j.paymentStatus}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${j.paymentStatus === PaymentStatus.PAID ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => handleOpenEdit(j)}
                          className="p-2 hover:bg-white text-slate-400 hover:text-emerald-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(j.id)}
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
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-500">Menampilkan {filteredJamaah.length} jamaah terdaftar</p>
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium disabled:opacity-50" disabled>Previous</button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium">Next</button>
            </div>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Hapus Jamaah?</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">Seluruh data pendaftaran dan riwayat pembayaran jamaah ini akan dihapus permanen.</p>
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

      {/* Jamaah Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl my-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-jakarta">
                    {modalMode === 'add' ? 'Registrasi Jamaah Baru' : 'Edit Profil Jamaah'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Lengkapi informasi administrasi pendaftaran Umroh.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap Sesuai Paspor</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      required
                      type="text" 
                      value={currentJamaah?.fullName || ''}
                      onChange={(e) => setCurrentJamaah({...currentJamaah, fullName: e.target.value})}
                      placeholder="Contoh: Muhammad Rayyan"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <ShieldCheck size={12} /> Nomor Paspor
                  </label>
                  <input 
                    required
                    type="text" 
                    value={currentJamaah?.passportNumber || ''}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, passportNumber: e.target.value})}
                    placeholder="A1234567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Phone size={12} /> Nomor WhatsApp
                  </label>
                  <input 
                    required
                    type="text" 
                    value={currentJamaah?.phone || ''}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, phone: e.target.value})}
                    placeholder="0812..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MapPin size={12} /> Alamat Domisili
                  </label>
                  <textarea 
                    rows={2}
                    value={currentJamaah?.address || ''}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, address: e.target.value})}
                    placeholder="Alamat lengkap sesuai KTP..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <BookOpen size={12} /> Pilih Paket
                  </label>
                  <select 
                    required
                    value={currentJamaah?.packageId}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, packageId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                  >
                    {MOCK_PACKAGES.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Rp {p.price.toLocaleString()})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={12} /> Tgl Registrasi
                  </label>
                  <input 
                    required
                    type="date" 
                    value={currentJamaah?.registrationDate || ''}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, registrationDate: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status Keaktifan</label>
                  <select 
                    value={currentJamaah?.status}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, status: e.target.value as any})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value="ACTIVE">AKTIF</option>
                    <option value="COMPLETED">SELESAI</option>
                    <option value="CANCELLED">BATAL</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <CreditCard size={12} /> Status Bayar
                  </label>
                  <select 
                    value={currentJamaah?.paymentStatus}
                    onChange={(e) => setCurrentJamaah({...currentJamaah, paymentStatus: e.target.value as any})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                  >
                    <option value={PaymentStatus.PENDING}>PENDING (Belum Bayar)</option>
                    <option value={PaymentStatus.PARTIAL}>PARTIAL (DP/Cicilan)</option>
                    <option value={PaymentStatus.PAID}>PAID (Lunas)</option>
                    <option value={PaymentStatus.CANCELLED}>CANCELLED</option>
                  </select>
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
                  {modalMode === 'add' ? 'Registrasi Jamaah' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JamaahPage;
