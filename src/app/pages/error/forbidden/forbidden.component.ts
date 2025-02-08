import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forbidden.component.html',
})
export class ForbiddenComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
