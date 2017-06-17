import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { User } from '../_models/user';
import { User2Service } from './user2.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class UserDetailResolve implements Resolve<any> {
    constructor(private user2Service: User2Service, private router: Router, private userService: UserService) { }
    currentUser_id = JSON.parse(localStorage.getItem('currentUser'))._id;

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getById(this.currentUser_id).map(user => {
            if (user) {
                console.log('user = ' + user);
                return user;
            } else { // id not found
                this.router.navigate(['/home']);
                return false;
            }
        });
    }
}