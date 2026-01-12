
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bell, Search, LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('umrah_current_user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('umrah_current_user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search jamaah, packages, or transactions..."
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
                  <img src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`} alt="profile" />
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </div>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-0" onClick={() => setShowDropdown(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 py-2 animate-in slide-in-from-top-2 duration-200">
                    <Link 
                      to="/profile" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <UserIcon size={18} />
                      <span className="font-semibold">My Profile</span>
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <Settings size={18} />
                      <span className="font-semibold">Account Settings</span>
                    </Link>
                    <div className="my-2 border-t border-slate-50"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="font-bold">Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
