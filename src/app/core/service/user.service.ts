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
  async getUserById(id: number): Promise<User | undefined> {
    return await this.db.users.get(id);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<number> {

    if (updates.email) {
      const existingUser = await this.getUserByEmail(updates.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already in use');
      }
    }

    const updateWithTimestamp = {
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    return await this.db.users.update(id, updateWithTimestamp);
  }
}
