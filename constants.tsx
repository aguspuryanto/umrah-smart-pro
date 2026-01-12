
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Plane, 
  CreditCard, 
  FileText, 
  Settings, 
  ShieldCheck 
} from 'lucide-react';
import { UserRole, Airline, UmrahPackage, Jamaah, PaymentStatus, User, Transaction, PaymentMethod } from './types';

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Data Jamaah', path: '/jamaah', icon: <Users size={20} /> },
  { name: 'Paket Umroh', path: '/packages', icon: <Package size={20} /> },
  { name: 'Maskapai', path: '/airlines', icon: <Plane size={20} /> },
  { name: 'Pembayaran', path: '/payments', icon: <CreditCard size={20} /> },
  { name: 'Laporan', path: '/reports', icon: <FileText size={20} /> },
  { name: 'User Management', path: '/users', icon: <ShieldCheck size={20} />, role: UserRole.ADMIN },
  { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi@umrahsmart.pro', role: UserRole.ADMIN, status: 'ACTIVE', lastLogin: '2024-01-18 09:00', avatar: 'https://i.pravatar.cc/150?u=budi' },
  { id: 'u2', name: 'Siti Rahma', email: 'siti@umrahsmart.pro', role: UserRole.FINANCE, status: 'ACTIVE', lastLogin: '2024-01-17 14:30', avatar: 'https://i.pravatar.cc/150?u=siti' },
  { id: 'u3', name: 'Andi Wijaya', email: 'andi@umrahsmart.pro', role: UserRole.OPERATOR, status: 'INACTIVE', lastLogin: '2024-01-10 10:15', avatar: 'https://i.pravatar.cc/150?u=andi' },
];

export const MOCK_AIRLINES: Airline[] = [
  { id: '1', name: 'Garuda Indonesia', code: 'GA', logo: 'https://logo.clearbit.com/garuda-indonesia.com', country: 'Indonesia', status: 'ACTIVE' },
  { id: '2', name: 'Saudi Arabian Airlines', code: 'SV', logo: 'https://logo.clearbit.com/saudia.com', country: 'Saudi Arabia', status: 'ACTIVE' },
  { id: '3', name: 'Qatar Airways', code: 'QR', logo: 'https://logo.clearbit.com/qatarairways.com', country: 'Qatar', status: 'ACTIVE' },
];

export const MOCK_PACKAGES: UmrahPackage[] = [
  {
    id: 'p1',
    name: 'Paket Ekonomi Ramadhan',
    description: 'Paket hemat untuk bulan suci Ramadhan dengan fasilitas bintang 4.',
    price: 28000000,
    durationDays: 9,
    airlineId: '1',
    hotelMakkah: 'Le Meridien',
    hotelMadinah: 'Dallah Taibah',
    departureDate: '2024-03-20',
    quota: 45,
    available: 12
  },
  {
    id: 'p2',
    name: 'Paket VIP Syawal',
    description: 'Pengalaman Umrah premium bintang 5 dengan akses dekat Masjidil Haram.',
    price: 45000000,
    durationDays: 12,
    airlineId: '2',
    hotelMakkah: 'Fairmont Clock Tower',
    hotelMadinah: 'Oberoi Madinah',
    departureDate: '2024-04-15',
    quota: 30,
    available: 5
  }
];

export const MOCK_JAMAAH: Jamaah[] = [
  {
    id: 'j1',
    fullName: 'Ahmad Subagyo',
    passportNumber: 'A1234567',
    phone: '08123456789',
    address: 'Jakarta Selatan',
    packageId: 'p1',
    registrationDate: '2023-12-01',
    status: 'ACTIVE',
    totalPaid: 28000000,
    paymentStatus: PaymentStatus.PAID
  },
  {
    id: 'j2',
    fullName: 'Siti Aminah',
    passportNumber: 'B9876543',
    phone: '087711223344',
    address: 'Bandung',
    packageId: 'p1',
    registrationDate: '2023-12-05',
    status: 'ACTIVE',
    totalPaid: 10000000,
    paymentStatus: PaymentStatus.PARTIAL,
    installments: [
      { id: 'i1', amount: 10000000, dueDate: '2023-12-05', status: 'PAID', paidDate: '2023-12-05', transactionRef: 'TX-001' },
      { id: 'i2', amount: 9000000, dueDate: '2024-01-05', status: 'UNPAID' },
      { id: 'i3', amount: 9000000, dueDate: '2024-02-05', status: 'UNPAID' }
    ]
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'TX-001', jamaahId: 'j1', amount: 28000000, date: '2023-12-01', method: PaymentMethod.CASH, status: 'SUCCESS', description: 'Pelunasan Paket Ekonomi Ramadhan' },
  { id: 'TX-002', jamaahId: 'j2', amount: 10000000, date: '2023-12-05', method: PaymentMethod.GATEWAY, status: 'SUCCESS', description: 'DP Paket Ekonomi Ramadhan' },
  { id: 'TX-003', jamaahId: 'j2', amount: 9000000, date: '2024-01-15', method: PaymentMethod.INSTALLMENT, status: 'PENDING', description: 'Cicilan ke-2' },
];
