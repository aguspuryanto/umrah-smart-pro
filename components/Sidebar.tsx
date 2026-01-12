
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-xl">
          U
        </div>
        <div>
          <h1 className="text-lg font-bold font-jakarta tracking-tight">UmrahSmart</h1>
          <p className="text-xs text-slate-400">Pro Edition</p>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {NAVIGATION_ITEMS.map((item) => (
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

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Logged in as:</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold truncate">Administrator</p>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest">Admin Access</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
