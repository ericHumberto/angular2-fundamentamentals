import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/login.component.html'
})
export class LoginComponent {
    constructor(private authService: AuthService,
        private router: Router) { }

    login(loginValues) {
        this.authService.loginUser(loginValues.userName, loginValues.password);
        this.router.navigate(['events']);
    }

    cancel() {
        this.router.navigate(['events']);
    }
}