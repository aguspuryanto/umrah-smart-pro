
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { User as UserIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('umrah_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navItems = [
    ...NAVIGATION_ITEMS,
    { name: 'My Profile', path: '/profile', icon: <UserIcon size={20} /> }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-900/40">
          U
        </div>
        <div>
          <h1 className="text-lg font-bold font-jakarta tracking-tight">UmrahSmart</h1>
          <p className="text-xs text-slate-400">Pro Edition</p>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="p-4 border-t border-slate-800 mt-auto">
          <NavLink to="/profile" className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 block hover:bg-slate-800 transition-colors group">
            <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Logged in as:</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400 overflow-hidden">
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate group-hover:text-emerald-400 transition-colors">{user.name}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{user.role}</p>
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
