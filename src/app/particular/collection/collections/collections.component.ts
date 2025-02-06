import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Collection} from "../../../models/collection";
import {CollectionService} from "../../../core/service/collection.service";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './collections.component.html',
  styles: ``
})
export class CollectionsComponent implements OnInit {
  particularId = JSON.parse(<string>localStorage.getItem('authUser')).id;
  collections: Collection[] = [];

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollectionsByParticular(this.particularId).subscribe({
      next: (data) => this.collections = data,
      error: (err) => console.error('Error fetching collections:', err)
    });
  }
}
