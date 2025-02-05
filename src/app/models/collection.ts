export interface Collection {
  id?: number;
  particularId: number;
  type: 'plastic' | 'glass' | 'paper' | 'metal';
  weight: number;
  photo?: string[];
  address: string;
  dateTime: string;
  notes?: string;
  status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected';
  collectorId?: number;
}
