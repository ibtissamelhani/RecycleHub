import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Collection} from "../../../models/collection";
import {CollectionService} from "../../../core/service/collection.service";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-collection-details',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe,
    NgClass,
    NgForOf
  ],
  templateUrl: './collection-details.component.html',
  styles: ``
})
export class CollectionDetailsComponent implements OnInit {
  collection?: Collection;

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
