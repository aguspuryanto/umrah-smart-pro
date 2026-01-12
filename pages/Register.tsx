
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok.');
      setLoading(false);
      return;
    }

    // Simulate registration
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('umrah_users') || '[]');
      if (storedUsers.some((u: any) => u.email === formData.email)) {
        setError('Email sudah terdaftar.');
        setLoading(false);
        return;
      }

      const newUser = {
        id: `u${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'OPERATOR',
        status: 'ACTIVE',
        avatar: `https://i.pravatar.cc/150?u=${formData.name}`
      };

      storedUsers.push(newUser);
      localStorage.setItem('umrah_users', JSON.stringify(storedUsers));
      
      // Auto login
      localStorage.setItem('umrah_current_user', JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      }));

      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-4 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Daftar Travel Umroh</h1>
            <p className="text-slate-500 mt-2 text-sm">Mulai kelola jamaah Anda dengan lebih profesional.</p>
          </div>

          <form onSubmit={handleRegister} className="p-8 pt-4 space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs font-bold text-rose-600">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ahmad Fauzi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Bisnis</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="admin@travel.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Konfirmasi</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Daftar Sekarang
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Sudah punya akun? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Masuk di sini</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
