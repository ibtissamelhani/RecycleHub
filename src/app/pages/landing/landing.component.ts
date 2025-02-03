import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AboutComponent} from "../about/about.component";
import {ContactComponent} from "../contact/contact.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './landing.component.html',
  styles: ``
})
export class LandingComponent {

}
