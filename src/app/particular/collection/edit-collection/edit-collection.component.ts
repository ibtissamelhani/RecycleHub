import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CollectionService} from "../../../core/service/collection.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Collection} from "../../../models/collection";
import {Material} from "../../../models/material";
import {maxTotalWeightValidator} from "../../../utils/maxWeightValidator";
import {collectDateTimeValidator} from "../../../utils/collectDateTimeValidator";

@Component({
  selector: 'app-edit-collection',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './edit-collection.component.html',
  styles: ``
})
export class EditCollectionComponent    implements OnInit {
  collectionForm: FormGroup;
  collectionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.collectionForm = this.fb.group({
      materials: this.fb.array([], [Validators.required, maxTotalWeightValidator()]),
      address: ['', [Validators.required, Validators.minLength(10)]],
      dateTime: ['', [Validators.required, collectDateTimeValidator()]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      notes: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.collectionId = +params['id'];
        this.loadCollection(this.collectionId);
      }
    });
  }

  private loadCollection(id: number) {
    this.collectionService.getCollectionById(id).subscribe({
      next: (collection) => {
        if (collection) {
          while (this.materials.length) {
            this.materials.removeAt(0);
          }


          collection.materials.forEach(material => {
            this.addMaterial(material);
          });

          this.collectionForm.patchValue({
            address: collection.address,
            dateTime: collection.dateTime,
            city: collection.city,
            notes: collection.notes,
            photo: collection.photo
          });
        }
      },
      error: (error) => console.error('Error loading collection:', error)
    });
  }



  get materials() {
    return this.collectionForm.get('materials') as FormArray;
  }

  addMaterial(material?: Material) {
    const materialForm = this.fb.group({
      type: [material?.type || '', Validators.required],
      weight: [material?.weight || '', [Validators.required, Validators.min(1), Validators.max(10)]]
    });

    this.materials.push(materialForm);
  }

  removeMaterial(index: number) {
    this.materials.removeAt(index);
  }


  onSubmit() {
    if (this.collectionForm.valid) {
      console.log(111111);

        this.collectionService.updateCollection(this.collectionId, this.collectionForm.value).subscribe({
          next: () => {
            console.log(3333)
            alert('collection information updated successfully');
          },
          error: (err) => {
            console.error('Error updating collection information:', err);
            alert('Failed to update collection information. Please try again.');
          }
        });
    } else {
        alert('Please fill out the form correctly');
    }
  }
}
