import Dexie from "dexie";
import {User} from "../models/user";


export class RecycleHubDb extends Dexie{

  users!: Dexie.Table<User,number>;
  constructor() {
    super('RecycleHubDatabase');
    this.version(1).stores({
      users: '++id,email,firstName,lastName,password,address,phone,birthDate,role'
    })
  }
}
