export interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  birthDate: string;
  role: 'collector' | 'particular';
  points?:number;
}
