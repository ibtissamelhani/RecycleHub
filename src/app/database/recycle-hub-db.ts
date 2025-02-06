import Dexie from "dexie";
import {User} from "../models/user";
import {Collection} from "../models/collection";


export class RecycleHubDb extends Dexie{

  users!: Dexie.Table<User,number>;
  collections!: Dexie.Table<Collection, number>;
  constructor() {
    super('RecycleHubDatabase');
    this.version(1).stores({
      users: '++id,email,firstName,lastName,password,address,phone,birthDate,role',
      collections: '++id, particularId, materials, photo, address, dateTime, notes, status, collectorId'
    })
  }
}
