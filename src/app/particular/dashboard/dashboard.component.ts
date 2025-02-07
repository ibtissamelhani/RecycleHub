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
  particularId = JSON.parse(<string>localStorage.getItem('authUser')).id;
  occupiedCollections: Collection[] = [];

  constructor(private collectionService: CollectionService, private router:Router) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollectionsByParticular(this.particularId).pipe(
      map(collections => collections.filter(collection => collection.status === 'pending'))
    ).subscribe({
      next: (data) => this.occupiedCollections = data,
      error: (err) => console.error('Error fetching collections:', err)
    });
  }
}
