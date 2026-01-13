
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Check, 
  Lock, 
  Clock, 
  ArrowLeft,
  Loader2,
  Phone,
  MapPin,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    phone: '',
    city: '',
    address: ''
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('umrah_current_user') || '{}');
    setCurrentUser(user);
    setFormData({ 
      name: user.name || '', 
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || '',
      address: user.address || ''
    });
  }, []);

  const handleSave = () => {
    setSaving(true);
    // Simulate API update
    setTimeout(() => {
      const updatedUser = { ...currentUser, ...formData };
      localStorage.setItem('umrah_current_user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      // Update in users list if needed
      const users = JSON.parse(localStorage.getItem('umrah_users') || '[]');
      const updatedUsers = users.map((u: any) => u.id === currentUser.id ? { ...u, ...formData } : u);
      localStorage.setItem('umrah_users', JSON.stringify(updatedUsers));
      
      setIsEditing(false);
      setSaving(false);
    }, 1000);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-600 shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Profil Pengguna</h1>
          <p className="text-slate-500">Kelola informasi pribadi dan pengaturan keamanan akun Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 text-center shadow-sm">
            <div className="relative inline-block group mb-6">
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-100 overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={currentUser.avatar || `https://i.pravatar.cc/150?u=${currentUser.id}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mt-1">{currentUser.role}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Status</p>
                  <p className="text-xs font-bold text-emerald-600">Verified Professional</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</p>
                  <p className="text-xs font-bold text-slate-700">Januari 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Informasi Pribadi</h3>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Edit Profil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 text-slate-400 text-xs font-bold hover:text-slate-600"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    Simpan Perubahan
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      disabled={!isEditing}
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none transition-all font-medium ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-emerald-500'}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      disabled={!isEditing}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none transition-all font-medium ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-emerald-500'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      disabled={!isEditing}
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="08123456789"
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none transition-all font-medium ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-emerald-500'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Kota</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input 
                      disabled={!isEditing}
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      placeholder="Jakarta Selatan"
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none transition-all font-medium ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-emerald-500'}`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                  <div className="relative">
                    <Home size={16} className="absolute left-4 top-4 text-slate-300" />
                    <textarea 
                      disabled={!isEditing}
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Jl. Raya Utama No. 123..."
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none transition-all font-medium resize-none ${!isEditing ? 'opacity-70 cursor-not-allowed' : 'focus:ring-2 focus:ring-emerald-500'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Keamanan Akun</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Password</p>
                    <p className="text-xs text-slate-500">Terakhir diperbarui 3 bulan yang lalu</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all">
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
