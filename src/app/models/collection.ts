import {Material} from "./material";

export interface Collection {
  id?: number;
  particularId: number;
  materials: Material[];
  photo?: string;
  address: string;
  dateTime: string;
  notes?: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
  collectorId?: number;
}
