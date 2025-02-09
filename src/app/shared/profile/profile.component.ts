import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  userId = JSON.parse(<string>localStorage.getItem('authUser')).id;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      birthDate: ['',[Validators.required]],
    });

    this.route.data.subscribe({
      next: (data) => {
        const user = data['userData'];
        if (user) {
          this.userForm.patchValue(user);
          console.log("user loaded")
        }
      },
      error: (err) => console.error('Error loading resolver data:', err),
    });

  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (user) {
          this.userForm.patchValue(user);
        }
      },
      error: (err) => {
        console.error('Error loading user data:', err);
      }
    });
  }

  onSave() {
    console.log(111111);
    if (this.userForm.valid) {
      console.log(22222)
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          alert('User information updated successfully');
        },
        error: (err) => {
          console.error('Error updating user information:', err);
          alert('Failed to update user information. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly');
    }
  }

  deleteAccount(){
     this.userService.deleteUser(this.userId).subscribe({
       next: () => {
         localStorage.removeItem('authUser');
         alert('Account deleted successfully');
         this.router.navigate(['/']);
       },
       error: (err) => {
         console.error('Error deleting account:', err);
         alert('Failed to delete account. Please try again.');
       }
     });
  }

}
