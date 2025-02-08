import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
