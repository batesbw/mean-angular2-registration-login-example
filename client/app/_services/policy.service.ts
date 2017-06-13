import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { AppConfig } from '../app.config';
import { Policy } from '../_models/index';

@Injectable()
export class PolicyService {
    constructor(private http: Http, private config: AppConfig) { }
    policyIsEdit = new EventEmitter<Policy>();

    getAll() {
        return this.http.get(this.config.apiUrl + '/policies', this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/policies/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(policy: Policy) {
        console.log(this.config.apiUrl + '/policies/register', policy, this.jwt());
        return this.http.post(this.config.apiUrl + '/policies/register', policy, this.jwt());
    }

    update(policy: Policy) {
        return this.http.put(this.config.apiUrl + '/policies/' + policy._id, policy, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/policies/' + _id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}