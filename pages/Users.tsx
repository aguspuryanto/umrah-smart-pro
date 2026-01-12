
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MoreVertical, 
  Plus, 
  Mail, 
  Clock, 
  ShieldAlert, 
  Trash2, 
  Edit3, 
  X, 
  Check,
  UserPlus,
  AlertTriangle
} from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User, UserRole } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-rose-100 text-rose-700 border-rose-200';
      case UserRole.FINANCE: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentUser({
      role: UserRole.OPERATOR,
      status: 'ACTIVE',
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setModalMode('edit');
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.name || !currentUser?.email) return;

    if (modalMode === 'add') {
      const newUser: User = {
        ...(currentUser as User),
        id: `u${Date.now()}`,
        lastLogin: '-'
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(u => u.id === currentUser.id ? (currentUser as User) : u));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-jakarta">User Management</h1>
          <p className="text-slate-500">Atur hak akses dan profil staf travel Umroh.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl group"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          Tambah Staf
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staf</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role & Akses</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Terakhir Login</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 group-hover:rotate-3 transition-transform">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => handleToggleStatus(user.id)}
                        className="flex items-center gap-2 group/status cursor-pointer"
                      >
                        <div className={`w-2 h-2 rounded-full transition-all ${user.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-300'}`}></div>
                        <span className={`text-xs font-bold transition-colors ${user.status === 'ACTIVE' ? 'text-emerald-700' : 'text-slate-400'}`}>
                          {user.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={14} />
                        <span className="text-xs font-medium">{user.lastLogin || 'Belum pernah'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"
                          title="Edit User"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => setShowDeleteConfirm(user.id)}
                          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                          title="Hapus User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Hapus Pengguna?</h3>
            <p className="text-sm text-slate-500 text-center mb-8">Tindakan ini tidak dapat dibatalkan. Pengguna tidak akan dapat mengakses sistem lagi.</p>
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
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border border-slate-100 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-jakarta">
                  {modalMode === 'add' ? 'Tambah Staf Baru' : 'Edit Profil Staf'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">Lengkapi informasi kredensial staf di bawah ini.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-100 overflow-hidden border-4 border-white shadow-md">
                    <img src={currentUser?.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                  </div>
                  <button type="button" className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                  <input 
                    required
                    type="text" 
                    value={currentUser?.name || ''}
                    onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                    placeholder="Contoh: Ahmad Fauzi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
                  <input 
                    required
                    type="email" 
                    value={currentUser?.email || ''}
                    onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                    placeholder="ahmad@umrahsmart.pro"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Role Akses</label>
                    <select 
                      value={currentUser?.role}
                      onChange={(e) => setCurrentUser({...currentUser, role: e.target.value as UserRole})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value={UserRole.ADMIN}>ADMIN</option>
                      <option value={UserRole.FINANCE}>FINANCE</option>
                      <option value={UserRole.OPERATOR}>OPERATOR</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Status</label>
                    <select 
                      value={currentUser?.status}
                      onChange={(e) => setCurrentUser({...currentUser, status: e.target.value as 'ACTIVE' | 'INACTIVE'})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                    >
                      <option value="ACTIVE">AKTIF</option>
                      <option value="INACTIVE">NON-AKTIF</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  {modalMode === 'add' ? 'Simpan Staf' : 'Perbarui Profil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2rem] flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h4 className="font-bold text-rose-900 mb-1">Keamanan & Audit Log</h4>
          <p className="text-sm text-rose-700/80 leading-relaxed">
            Setiap perubahan pada User Management dicatat dalam sistem audit log untuk keperluan keamanan. Pastikan Anda memberikan hak akses yang sesuai dengan prinsip <i>Least Privilege</i>. Penambahan staf baru secara otomatis mengaktifkan autentikasi standar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Users;
