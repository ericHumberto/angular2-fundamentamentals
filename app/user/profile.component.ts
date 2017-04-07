import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'app/user/profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    let firstName = new FormControl(this.authService.currentUser.firstName);
    let lastName = new FormControl(this.authService.currentUser.lastName);
    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    });
  }

  saveProfile(profileValues) {
    this.authService.updateCurrentUser(profileValues.firstName, profileValues.lastName)
    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}