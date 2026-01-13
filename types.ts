
export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  FINANCE = 'FINANCE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
  phone?: string;
  city?: string;
  address?: string;
}

export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
  country: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface UmrahPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  airlineId: string;
  hotelMakkah: string;
  hotelMadinah: string;
  departureDate: string;
  quota: number;
  available: number;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  INSTALLMENT = 'INSTALLMENT',
  GATEWAY = 'GATEWAY'
}

export interface Installment {
  id: string;
  amount: number;
  dueDate: string;
  status: 'UNPAID' | 'PAID';
  paidDate?: string;
  transactionRef?: string;
}

export interface Transaction {
  id: string;
  jamaahId: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  description: string;
}

export interface Jamaah {
  id: string;
  fullName: string;
  passportNumber: string;
  phone: string;
  address: string;
  packageId: string;
  registrationDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  totalPaid: number;
  paymentStatus: PaymentStatus;
  installments?: Installment[];
}
