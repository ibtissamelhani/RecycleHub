import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-particular-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './particular-dashboard.component.html',
  styles: ``
})
export class ParticularDashboardComponent {
  constructor(private router: Router) {
  }
  logout(): void {
    localStorage.removeItem('authUser');
    this.router.navigate(['/']);
  }
}
