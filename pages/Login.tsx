
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('umrah_users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      
      // Default mock login
      if ((email === 'budi@umrahsmart.pro' && password === 'admin') || user) {
        const userData = user || { 
          id: 'u1', 
          name: 'Budi Santoso', 
          email: 'budi@umrahsmart.pro', 
          role: 'ADMIN',
          avatar: 'https://i.pravatar.cc/150?u=budi'
        };
        localStorage.setItem('umrah_current_user', JSON.stringify(userData));
        navigate('/');
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="p-8 pb-4 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Selamat Datang</h1>
            <p className="text-slate-500 mt-2 text-sm">Masuk ke UmrahSmart Pro untuk mengelola travel Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 pt-4 space-y-5">
            {error && (
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs font-bold text-rose-600 animate-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Bisnis</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700">Lupa Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                />
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
                  Masuk Sekarang
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Belum punya akun? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Daftar Travel Baru</Link>
            </p>
          </div>
        </div>
        <p className="text-center mt-8 text-xs text-slate-400 font-medium tracking-wide">
          &copy; 2024 UmrahSmart Pro. Seluruh Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  );
};

export default Login;
