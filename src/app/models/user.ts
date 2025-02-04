export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  birthDate: string;
  type: 'collector' | 'particular';
}
