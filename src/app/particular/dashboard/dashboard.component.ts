import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/navbar/navbar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
}
