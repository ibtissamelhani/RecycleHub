export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthDate: string;
  role: 'collector' | 'particular';
}
