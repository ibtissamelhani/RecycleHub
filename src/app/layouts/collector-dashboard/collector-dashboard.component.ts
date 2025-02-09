import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-collector-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './collector-dashboard.component.html',
  styles: ``
})
export class CollectorDashboardComponent {
  constructor(private router: Router) {
  }
  logout(): void {
    localStorage.removeItem('authUser');
    this.router.navigate(['/']);
  }
}
