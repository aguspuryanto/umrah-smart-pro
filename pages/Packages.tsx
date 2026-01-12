
import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Calendar, 
  Plane, 
  MapPin, 
  Users, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  AlertTriangle,
  Hotel,
  Clock,
  DollarSign
} from 'lucide-react';
import { MOCK_PACKAGES, MOCK_AIRLINES } from '../constants';
import { UmrahPackage } from '../types';

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<UmrahPackage[]>(MOCK_PACKAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentPkg, setCurrentPkg] = useState<Partial<UmrahPackage> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentPkg({
      name: '',
      description: '',
      price: 0,
      durationDays: 9,
      airlineId: MOCK_AIRLINES[0].id,
      hotelMakkah: '',
      hotelMadinah: '',
      departureDate: new Date().toISOString().split('T')[0],
      quota: 45,
      available: 45
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: UmrahPackage) => {
    setModalMode('edit');
    setCurrentPkg(pkg);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPackages(packages.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPkg?.name || !currentPkg?.price) return;

    if (modalMode === 'add') {
      const newPkg: UmrahPackage = {
        ...(currentPkg as UmrahPackage),
        id: `p${Date.now()}`,
      };
      setPackages([...packages, newPkg]);
    } else {
      setPackages(packages.map(p => p.id === currentPkg.id ? (currentPkg as UmrahPackage) : p));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Paket Umroh</h1>
          <p className="text-slate-500">Konfigurasi paket perjalanan, akomodasi, dan kuota jamaah.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Buat Paket Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden group hover:border-emerald-500 transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl">
            <div className="h-56 relative overflow-hidden">
                <img 
                    src={`https://picsum.photos/seed/${pkg.id}/600/400`} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex gap-3 scale-90 group-hover:scale-100 transition-transform duration-300">
                    <button 
                      onClick={() => handleOpenEdit(pkg)}
                      className="bg-white p-3 rounded-2xl text-slate-900 hover:bg-emerald-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(pkg.id)}
                      className="bg-white p-3 rounded-2xl text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl font-bold text-emerald-700 text-sm shadow-lg">
                    Rp {pkg.price.toLocaleString()}
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-2">
                    <Clock size={12} />
                    {pkg.durationDays} Hari
                </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{pkg.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{pkg.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Plane size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Airlines</p>
                    <p className="text-xs font-bold text-slate-700">{MOCK_AIRLINES.find(a => a.id === pkg.airlineId)?.name.split(' ')[0] || 'Airlines'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Berangkat</p>
                    <p className="text-xs font-bold text-slate-700">{pkg.departureDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Hotel size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hotel</p>
                    <p className="text-xs font-bold text-slate-700 truncate max-w-[80px]">{pkg.hotelMakkah}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tersedia</p>
                    <p className="text-xs font-bold text-emerald-600">{pkg.available} / {pkg.quota}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-auto">
                <button className="flex-1 py-3 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                  Detail Paket
                </button>
                <button 
                  onClick={() => handleOpenEdit(pkg)}
                  className="flex-1 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Edit Paket
                </button>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={handleOpenAdd}
          className="h-[550px] border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-emerald-500 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all group"
        >
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-110 transition-all">
                <Plus size={32} />
            </div>
            <p className="font-bold text-lg">Tambah Paket Baru</p>
        </button>
      </div>

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Hapus Paket?</h3>
            <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">Paket yang dihapus tidak akan dapat diakses oleh jamaah baru. Data transaksi yang sudah ada tetap tersimpan.</p>
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
                Hapus Paket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl my-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-jakarta">
                    {modalMode === 'add' ? 'Buat Paket Baru' : 'Edit Paket Perjalanan'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Konfigurasikan harga, fasilitas, dan jadwal keberangkatan.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Paket</label>
                  <input 
                    required
                    type="text" 
                    value={currentPkg?.name || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, name: e.target.value})}
                    placeholder="Contoh: Paket VIP Syawal 2024"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Deskripsi Singkat</label>
                  <textarea 
                    rows={3}
                    value={currentPkg?.description || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, description: e.target.value})}
                    placeholder="Tuliskan keunggulan paket ini..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <DollarSign size={12} /> Harga (IDR)
                  </label>
                  <input 
                    required
                    type="number" 
                    value={currentPkg?.price || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, price: parseInt(e.target.value)})}
                    placeholder="28000000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Clock size={12} /> Durasi (Hari)
                  </label>
                  <input 
                    required
                    type="number" 
                    value={currentPkg?.durationDays || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, durationDays: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Plane size={12} /> Maskapai
                  </label>
                  <select 
                    value={currentPkg?.airlineId}
                    onChange={(e) => setCurrentPkg({...currentPkg, airlineId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none"
                  >
                    {MOCK_AIRLINES.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar size={12} /> Tanggal Berangkat
                  </label>
                  <input 
                    required
                    type="date" 
                    value={currentPkg?.departureDate || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, departureDate: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Hotel size={12} /> Hotel Makkah
                  </label>
                  <input 
                    type="text" 
                    value={currentPkg?.hotelMakkah || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, hotelMakkah: e.target.value})}
                    placeholder="Contoh: Fairmont Makkah"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Hotel size={12} /> Hotel Madinah
                  </label>
                  <input 
                    type="text" 
                    value={currentPkg?.hotelMadinah || ''}
                    onChange={(e) => setCurrentPkg({...currentPkg, hotelMadinah: e.target.value})}
                    placeholder="Contoh: Dallah Taibah"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Users size={12} /> Kuota Total
                  </label>
                  <input 
                    required
                    type="number" 
                    value={currentPkg?.quota || ''}
                    onChange={(e) => {
                      const quota = parseInt(e.target.value);
                      setCurrentPkg({...currentPkg, quota, available: quota});
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
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
                  {modalMode === 'add' ? 'Simpan Paket' : 'Perbarui Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Packages;
