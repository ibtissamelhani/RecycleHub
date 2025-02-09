import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-auth-template',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './auth-template.component.html',
  styles: ``
})
export class AuthTemplateComponent {

}
