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
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      birthDate: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  async onSubmit() {

    this.errorMessage = '';

    try {
      const existingUser = await this.userService.getUserByEmail(
        this.registrationForm.value.email
      );

      if (existingUser) {
        this.errorMessage = 'Email already registered';
        console.log("Email already registered")
        return;
      }
      const userData = {
        ...this.registrationForm.value,
        role: 'particular'
      };

      const userId = await this.userService.addUser(userData);
      await this.router.navigate(['/authentication/login']);
      console.log('registered')
    } catch (error) {
      console.error('Registration error:', error);
      this.errorMessage = 'Registration failed. Please try again.';
    }
  }

}
