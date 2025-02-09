import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Collection} from "../../../models/collection";
import {CollectionService} from "../../../core/service/collection.service";
import {collectDateTimeValidator} from "../../../utils/collectDateTimeValidator";
import {Router, RouterLink} from "@angular/router";
import {maxTotalWeightValidator} from "../../../utils/maxWeightValidator";

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgStyle,
    NgIf,
    RouterLink
  ],
  templateUrl: './create-collection.component.html',
  styles: ``
})
export class CreateCollectionComponent implements OnInit {
  collectionForm: FormGroup;
  authUserId = JSON.parse(<string>localStorage.getItem('authUser')).id;

  constructor(private fb: FormBuilder, private router:Router ,private collectionService: CollectionService) {
    this.collectionForm = this.fb.group({
      materials: this.fb.array([this.createMaterial()], maxTotalWeightValidator()),
      address: ['', Validators.required],
      city: ['', Validators.required],
      dateTime: ['', [Validators.required, collectDateTimeValidator()]],
      notes: [''],
      photo:[''],
      status: ['pending', Validators.required],
    });
  }

  ngOnInit() {}

  get materials() {
    return this.collectionForm.get('materials') as FormArray;
  }

  createMaterial() {
    return this.fb.group({
      type: ['', Validators.required],
      weight: [0, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  addMaterial() {
    this.materials.push(this.createMaterial());
  }

  removeMaterial(index: number) {
    if (this.materials.length > 1) {
      this.materials.removeAt(index);
    }
  }

  selectedPhoto: string | null = null;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.collectionForm.valid) {

      this.collectionService.checkMaxActiveRequests(this.authUserId).subscribe({
        next: (canCreate) => {
          if (!canCreate) {
            alert('You can only have a maximum of 3 active requests.');
            this.router.navigate(["/particular/collections"])
            return;
          }
          const collectionData: Collection = {
            particularId: this.authUserId,
            ...this.collectionForm.value,
            photo: this.selectedPhoto,
          };
          this.add(collectionData);
        },
        error: (err) => {
          console.error('Error checking active requests:', err);
        }
      });

    } else {
      alert('Please fill out the form correctly');
    }
  }


  private add(collectionData : Collection){
    this.collectionService.addCollection(collectionData).subscribe({
      next: (id) => {
        console.log('Collection added successfully with ID:', id);
        alert('Collection created successfully');
        this.router.navigate(["/particular/collections"])
      },
      error: (err) => {
        console.error('Error adding collection:', err);
        alert('Failed to create collection');
      }
    });
  }

}
