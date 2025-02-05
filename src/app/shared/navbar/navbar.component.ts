import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {
  }
  isAuthenticated = false;

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('authUser');
  }

  logout(): void {
    localStorage.removeItem('authUser');
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }
}
