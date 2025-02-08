import {Component, OnInit} from '@angular/core';
import {Collection} from "../../../models/collection";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CollectionService} from "../../../core/service/collection.service";
import {CommonModule, DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    DatePipe,
    CommonModule
  ],
  templateUrl: './details.component.html',
  styles: ``
})
export class DetailsComponent implements OnInit {
  collection?: Collection;
  authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.collectionService.getCollectionById(id).subscribe({
      next: (data) =>{
        this.collection = data;
        console.log(this.collection)
      } ,
      error: (err) => console.error('Error fetching collection details:', err)
    });
  }

  onAcceptCollectionRequest(collectionId: number) {

    this.collectionService.updateCollectionStatus(collectionId, 'occupied',this.authUser.id).subscribe({
      next: () => {
        console.log('Collection request accepted and status set to occupied.');
        alert('You have accepted the request. The status is now "Occupied".');
        this.router.navigate(['/collector/dashboard'])
      },
      error: (err) => {
        console.error('Error updating collection status:', err);
        alert('Failed to accept the collection request.');
      }
    });
  }

}
