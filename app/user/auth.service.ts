import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/RX';

@Injectable()
export class AuthService {
    currentUser: IUser;

    constructor(private http: Http) { }

    loginUser(userName: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let loginInfo = { username: userName, password: password };

        return this.http.post('/api/login', JSON.stringify(loginInfo), options).do(resp => {
            if (resp)
                this.currentUser = <IUser>resp.json().user;
        }).catch(error => {
            return Observable.of(false);
        });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}