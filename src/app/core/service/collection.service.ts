import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {from, map, Observable} from "rxjs";
import {Collection} from "../../models/collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
  }

  addCollection(collection: Collection): Observable<number> {
    return from(this.db.collections.add(collection));
  }

  getAllCollections(): Observable<Collection[]> {
    return from(this.db.collections.toArray());
  }

  getCollectionsByParticular(particularId: number): Observable<Collection[]> {
    return from(this.db.collections.where('particularId').equals(particularId).reverse()
      .sortBy('id'));
  }

  deleteCollection(id: number): Observable<void> {
    return from(this.db.collections.delete(id));
  }

  getCollectionById(id: number): Observable<Collection | undefined> {
    return from(this.db.collections.get(id));
  }

  getCollectionsByCity(userCity: string): Observable<Collection[]> {
    const cityLowerCase = userCity.toLowerCase();
    return from(this.db.collections.filter(c => c.city?.toLowerCase() === cityLowerCase  && c.status === 'pending').reverse().sortBy('id'));
  }

  updateCollectionStatus(collectionId: number, status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected', collectorId: number): Observable<number> {
    return from(this.db.collections.update(collectionId, { status, collectorId }));
  }

  updateCollection(collectionId: number | null, updates: Partial<Collection>): Observable<number> {
    return from(this.db.collections.update(collectionId!,updates))
  }

  getCollectionsByCollectorId(collectorId: number): Observable<Collection[]> {
    return from(this.db.collections.where('collectorId').equals(collectorId).toArray());
  }

  checkMaxActiveRequests(particularId: number): Observable<boolean> {
    return from(
      this.db.collections
        .where('particularId')
        .equals(particularId)
        .filter((c) => c.status !== 'validated' && c.status !== 'rejected')
        .toArray()
    ).pipe(
      map((activeRequests) => activeRequests.length < 3)
    );
  }
}
