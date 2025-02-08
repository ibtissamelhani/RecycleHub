import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      birthDate: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {

    this.errorMessage = '';

    this.userService.getUserByEmail(this.registrationForm.value.email).subscribe({
      next: (existingUser) => {
        if (existingUser) {
          this.errorMessage = 'Email already registered';
          console.log("Email already registered")
          return;
        }
        console.log(1)

        const userData = {
          ...this.registrationForm.value,
          role: 'particular'
        };
        console.log(2);
        this.userService.addUser(userData).subscribe({
          next: (userId) => {
             this.router.navigate(['/authentication/login']);
            console.log('Registered successfully with userId:', userId);
          },
          error: (err) => {
            console.error('Registration error:', err);
            this.errorMessage = 'Registration failed. Please try again.';
          },
        });
      },
      error: (err) => {
        console.error('Error checking user:', err);
        this.errorMessage = 'An error occurred. Please try again.';
      }
    })
  }

}
