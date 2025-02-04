import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {Collection} from "../../models/collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
  }

  async addCollection(collection: Collection): Promise<number> {
    return await this.db.collections.add(collection);
  }
}
