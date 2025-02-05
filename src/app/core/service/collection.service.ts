import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
  }


}
