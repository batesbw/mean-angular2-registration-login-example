import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';
import { AppConfig } from '../app.config';

@Injectable()
export class User2Service {

    constructor(private http: Http, private config: AppConfig) { }
    userUrl = this.config.apiUrl + '/users';
    getUsers(): Promise<Array<User>> {
        return this.http
            .get(this.userUrl, this.jwt())
            .toPromise()
            .then((response) => {
                console.log(response.json());
                return response.json() as User[];
            })
            .catch(this.handleError);
    }

    getUser(_id: string): Promise<User> {
        return this.getUsers()
            .then(users => users.find(user => user._id == _id));
    }

    save(user: User): Promise<User> {
        if (user._id) {
            return this.put(user);
        }
        return this.post(user);
    }

    delete(user: User): Promise<Response> {
        //const headers = new Headers();
        //headers.append('Content-Type', 'application/json');

        const url = `${this.userUrl}/${user._id}`;

        return this.http
            .delete(url, this.jwt())
            .toPromise()
            .catch(this.handleError);
    }

    // Add new User
    private post(user: User): Promise<User> {
        //const headers = new Headers({
        //    'Content-Type': 'application/json'
        //});

        return this.http
            .post(this.userUrl, JSON.stringify(user), this.jwt())
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing User
    private put(user: User): Promise<User> {
        //const headers = new Headers();
        //headers.append('Content-Type', 'application/json');

        const url = `${this.userUrl}/${user._id}`;

        return this.http
            .put(url, JSON.stringify(user), this.jwt())
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}