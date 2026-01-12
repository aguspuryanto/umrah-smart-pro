
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Jamaah = lazy(() => import('./pages/Jamaah'));
const Packages = lazy(() => import('./pages/Packages'));
const Reports = lazy(() => import('./pages/Reports'));
const Airlines = lazy(() => import('./pages/Airlines'));
const Payments = lazy(() => import('./pages/Payments'));
const Users = lazy(() => import('./pages/Users'));

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={
          <div className="flex h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Menyiapkan dashboard...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jamaah" element={<Jamaah />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/users" element={<Users />} />
            {/* Fallback paths */}
            <Route path="/settings" element={<div className="p-10 text-center font-bold text-slate-400 bg-white rounded-3xl border border-slate-100">Fitur Pengaturan (Segera Hadir)</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
