import {Component, OnInit} from '@angular/core';
import {CollectionService} from "../../../core/service/collection.service";
import {Collection} from "../../../models/collection";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './collections.component.html',
  styles: ``
})
export class CollectionsComponent implements OnInit {
  authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  collections: Collection[] = [];
  errorMessage: string = '';

  constructor(
    private collectionService: CollectionService
  ) { }

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.collectionService.getCollectionsByCollectorId(this.authUser.id).subscribe({
      next: (data) => {
        this.collections = data;
      },
      error: (err) => {
        this.errorMessage = `Error loading collections: ${err.message}`;
      }
    });
  }

  onValidateCollection(collectionId: number) {
    this.collectionService.updateCollectionStatus(collectionId, 'validated',this.authUser.id).subscribe({
      next: () => {
        console.log('Collection request accepted and status set to validation.');
        alert('You have validated the request. The status is now "validated".');
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to validate the collection request.');
      }
    });
  }
  onRejectCollection(collectionId: number) {
    this.collectionService.updateCollectionStatus(collectionId, 'rejected',this.authUser.id).subscribe({
      next: () => {
        console.log('Collection request rejected and status set to rejected.');
        alert('You have rejected the request.');
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to rejected the collection request.');
      }
    });
  }
}
