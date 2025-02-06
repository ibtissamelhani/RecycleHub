import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
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
}
