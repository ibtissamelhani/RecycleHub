import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {from, Observable} from "rxjs";
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
    return from(this.db.collections.where('particularId').equals(particularId).toArray());
  }
}
