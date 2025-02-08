import {Component, OnInit} from '@angular/core';
import {CollectionService} from "../../core/service/collection.service";
import {Collection} from "../../models/collection";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    DatePipe,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit{
  userCollections: Collection[] | undefined;

  constructor(private collectionService: CollectionService) {
  }
  ngOnInit() {
    const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');

    if (authUser && authUser.city) {
      this.loadCollections(authUser.city);
    } else {
      console.error('No city found for the logged-in user.');
    }
  }

  loadCollections(city: string) {
    this.collectionService.getCollectionsByCity(city).subscribe({
      next: (collections) => {
        console.log('Collections in the user city:', collections);
        this.userCollections = collections;
      },
      error: (err) => {
        console.error('Error fetching collections:', err);
      }
    });
  }
}
