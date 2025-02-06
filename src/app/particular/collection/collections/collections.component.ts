import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
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

  constructor(private collectionService: CollectionService, private router:Router) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections() {
    this.collectionService.getCollectionsByParticular(this.particularId).subscribe({
      next: (data) => this.collections = data,
      error: (err) => console.error('Error fetching collections:', err)
    });
  }

  deleteCollection(id: number){
    if (confirm('Are you sure you want to delete this Request?')) {
      this.collectionService.deleteCollection(id).subscribe({
        next: () => {
          this.router.navigate(["/particular/collections"])
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete collection');
        },
      })
    }
  }
}
