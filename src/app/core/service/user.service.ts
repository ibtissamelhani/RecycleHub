import { Injectable } from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {User} from "../../models/user";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
  }


  addUser(user: User): Observable<number> {
    return new Observable<number>(observer => {

      this.db.users.where('email').equals(user.email).first().then(existingUser => {

        if (existingUser) {
          observer.error('Email already exists');
        } else {
          this.db.users.add(user);
        }
      });
    });
  }


  getUserByEmail(email: string): Observable<User | undefined> {
    return from(this.db.users.where('email').equals(email).first());
  }

  getUserById(id: number): Observable<User | undefined> {
    return from(this.db.users.get(id));
  }

  updateUser(id: number, updates: Partial<User>): Observable<number> {
    return new Observable<number>(observer => {
      if (updates.email) {
        this.getUserByEmail(updates.email).subscribe({
          next: (existingUser) => {
            if (existingUser && existingUser.id !== id) {
              observer.error('Email already in use');
            } else {
              const updateWithTimestamp = {
                ...updates,
                lastUpdated: new Date().toISOString(),
              };
              this.db.users.update(id, updateWithTimestamp)
                .then(updated => {
                  observer.next(updated);
                  observer.complete();
                })
                .catch(err => observer.error(err));
            }
          },
          error: (err) => observer.error(err),
        });
      } else {
        const updateWithTimestamp = {
          ...updates,
          lastUpdated: new Date().toISOString(),
        };
        this.db.users.update(id, updateWithTimestamp)
          .then(updated => {
            observer.next(updated);
            observer.complete();
          })
          .catch(err => observer.error(err));
      }
    });
  }

  deleteUser(id: number): Observable<void> {
    return from(this.db.users.delete(id));
  }
}
