import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {Router, RouterLink} from "@angular/router";
import {Collection} from "../../models/collection";
import {CollectionService} from "../../core/service/collection.service";
import {map} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit {

  authUser = JSON.parse(<string>localStorage.getItem('authUser'));
  occupiedCollections: Collection[] = [];
  pendingRequest: number = 0;
  validatedRequest: number = 0;
  rejectedRequest: number = 0;

  constructor(private collectionService: CollectionService, private router:Router) {}

  ngOnInit(): void {
    this.loadCollections();
    this.pendingRequestCount();
    this.validatedRequestCount();
    this.rejectedRequestCount();
  }

  loadCollections() {
    this.collectionService.getCollectionsByParticular(this.authUser.id).pipe(
      map(collections => collections.filter(collection => collection.status === 'occupied'))
    ).subscribe({
      next: (data) => this.occupiedCollections = data,
      error: (err) => console.error('Error fetching collections:', err)
    });
  }

   pendingRequestCount(){
    this.collectionService.getCollectionsByParticular(this.authUser.id)
      .pipe(
        map((collections) => collections.filter((collection) => collection.status === 'pending').length)
      )
      .subscribe({
        next: (count) => {
          this.pendingRequest = count;
          console.log(`Number of pending requests: ${count}`);
        },
        error: (err) => {
          console.error('Error fetching pending requests:', err);
        }
      });
  }

   validatedRequestCount(){
      this.collectionService.getCollectionsByParticular(this.authUser.id)
        .pipe(
          map((collections) => collections.filter((collection) => collection.status === 'validated').length)
        )
        .subscribe({
          next: (count) => {
            this.validatedRequest = count;
            console.log(`Number of pending requests: ${count}`);
          },
          error: (err) => {
            console.error('Error fetching pending requests:', err);
          }
        }
      );
   }

  rejectedRequestCount(){
    this.collectionService.getCollectionsByParticular(this.authUser.id)
      .pipe(
        map((collections) => collections.filter((collection) => collection.status === 'rejected').length)
      )
      .subscribe({
          next: (count) => {
            this.rejectedRequest = count;
            console.log(`Number of pending requests: ${count}`);
          },
          error: (err) => {
            console.error('Error fetching pending requests:', err);
          }
        }
      );
  }
}
