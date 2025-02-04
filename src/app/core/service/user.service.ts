import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
  }

  async addUser(user: User): Promise<number> {
    const existingUser = await this.db.users.where('email').equals(user.email).first();
    if (existingUser) {
      throw new Error('Email already exists');
    }
    return this.db.users.add(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.db.users
      .where('email')
      .equals(email)
      .first();
  }
}
