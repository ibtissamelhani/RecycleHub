import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../core/service/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(){
    this.errorMessage = '';

    this.userService.getUserByEmail(this.loginForm.value.email).subscribe({
      next:(existingUser) =>{

        if (!existingUser) {
          this.errorMessage = 'user doesnt exist';
          console.log("user doesnt exist")
          return;
        }
        if(existingUser.password != this.loginForm.value.password){
          this.errorMessage = 'invalid email or password ';
          console.log("invalid email or password ")
          return;
        }
        console.log("logged")
        localStorage.setItem("authUser", JSON.stringify({
          id: existingUser.id,
          city: existingUser.city,
          role: existingUser.role,
          points: existingUser.points
        }));
        if (existingUser.role === "particular") {
           this.router.navigate(['/particular/dashboard']);
        }else if(existingUser.role === "collector") {
           this.router.navigate(['/collector/dashboard']);
        }
      },
      error: (err) => {
        console.error('Authentication error:', err);
        this.errorMessage = 'Authentication failed. Please try again.';
      }
    });
  }
}
