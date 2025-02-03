import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {ContactComponent} from "../contact/contact.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AboutComponent,
    ContactComponent
  ],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent {

}
