import {Injectable} from '@angular/core';
import {RecycleHubDb} from "../../database/recycle-hub-db";
import {User} from "../../models/user";
import {from, Observable, switchMap} from "rxjs";
import {Material} from "../../models/material";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: RecycleHubDb;

  constructor() {
    this.db = new RecycleHubDb();
    this.initializeCollectors();
  }


  addUser(user: User): Observable<number> {
    return from(this.db.users.add(user));
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

  calculatePoints(materials: Material[]): number {
    return materials.reduce((total, material) => {
      switch (material.type) {
        case 'plastic':
          return total + material.weight * 2;
        case 'glass':
          return total + material.weight ;
        case 'paper':
          return total + material.weight ;
        case 'metal':
          return total + material.weight * 5;
        default: return total;
      }
    }, 0);
  }

  updateUserPoints(particularId: number, pointsToAdd: number) {
    return from(this.db.users.where('id').equals(particularId).first()).pipe(
      switchMap((user) => {
        if (user) {

          user.points = user.points ? user.points + pointsToAdd : pointsToAdd;

          return from(this.db.users.put(user));
        } else {
          throw new Error('User not found');
        }
      })
    );
  }


  private async initializeCollectors() {
    const collectorsCount = await this.db.users.where('role').equals('collector').count();

    if (collectorsCount === 0) {
      const collectors: User[] = [
        {
          email: 'collector1@recyclehub.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Collector',
          address: 'City Center, Casablanca',
          city:'Casablanca',
          phone: '0600000001',
          birthDate: '1990-01-01',
          role: 'collector'
        },
        {
          email: 'collector2@recyclehub.com',
          password: 'password123',
          firstName: 'ibtissam',
          lastName: 'Collector',
          address: 'City Center',
          city:'marrakech',
          phone: '0600000001',
          birthDate: '2000-01-01',
          role: 'collector'
        }
      ];
      this.db.users.bulkAdd(collectors);
    }
  }

}
