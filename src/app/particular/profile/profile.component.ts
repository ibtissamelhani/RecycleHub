import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {NgIf} from "@angular/common";

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

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(2)]],
      lastName: ['',[Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      birthDate: ['',[Validators.required]],
    });

    this.loadUserData();
  }

  async loadUserData(): Promise<void> {
    const user = await this.userService.getUserById(this.userId);
    if (user) {
      this.userForm.patchValue(user);
    }
  }

  async onSave(): Promise<void> {
    if (this.userForm.valid) {
      await this.userService.updateUser(this.userId, this.userForm.value);
      alert('User information updated successfully');
    } else {
      alert('Please fill out the form correctly');
    }
  }

}
