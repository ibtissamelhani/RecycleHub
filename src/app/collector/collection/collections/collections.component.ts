import {Component, OnInit} from '@angular/core';
import {CollectionService} from "../../../core/service/collection.service";
import {Collection} from "../../../models/collection";
import {CommonModule} from "@angular/common";
import {UserService} from "../../../core/service/user.service";

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
    private collectionService: CollectionService,
    private userService: UserService
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

      next: (updatedCount) =>{
        if (updatedCount > 0) {
          console.log('Collection request accepted and status set to validation.');

          this.collectionService.getCollectionById(collectionId).subscribe({
            next: (collection) => {
              if (collection) {
                const pointsToAdd = this.userService.calculatePoints(collection.materials);

                this.userService.updateUserPoints(collection.particularId, pointsToAdd).subscribe({
                  next: () => {
                    console.log('Points successfully added to the user.'+ pointsToAdd);
                    alert('Points have been successfully added to the user.'+ pointsToAdd);
                  },
                  error: (err) => {
                    console.error('Error adding points:', err);
                    alert('Failed to add points to the user.');
                  }
                });
              }
            },
            error: (err) => {
              console.error('Error fetching collection:', err);
              alert('Failed to retrieve collection details.');
            }
          });
        } else {
          console.error('No collections were updated.');
          alert('Failed to validate the collection request.');
        }
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
