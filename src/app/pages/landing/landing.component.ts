import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AboutComponent} from "../about/about.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AboutComponent
  ],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent {

}
