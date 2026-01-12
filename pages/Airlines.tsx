
import React from 'react';
import { Plane, Plus, Globe, ShieldCheck, MoreHorizontal, ExternalLink } from 'lucide-react';
import { MOCK_AIRLINES } from '../constants';

const Airlines: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">Manajemen Maskapai</h1>
          <p className="text-slate-500">Kelola data mitra maskapai dan jadwal operasional penerbangan.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl">
          <Plus size={20} />
          Tambah Maskapai
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_AIRLINES.map((airline) => (
          <div key={airline.id} className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <img src={airline.logo} alt={airline.name} className="max-w-full h-auto" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                airline.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {airline.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{airline.name}</h3>
                <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                  <Globe size={14} />
                  {airline.country} • Kode: {airline.code}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Flight Score</p>
                  <p className="text-sm font-bold text-slate-700">9.8/10</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Routes</p>
                  <p className="text-sm font-bold text-slate-700">12 Routes</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-bold">Verified Partner</span>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-8 text-slate-400 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 group-hover:text-emerald-500 transition-colors">
            <Plus size={24} />
          </div>
          <p className="font-bold text-sm">Add New Partner</p>
        </div>
      </div>
    </div>
  );
};

export default Airlines;
