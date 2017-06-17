import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { User } from '../_models/user';
import { User2Service } from './user2.service';

@Injectable()
export class UserDetailResolve implements Resolve<any> {
    constructor(private user2Service: User2Service, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        let id = route.params['_id'];
        return this.user2Service.getUser(id).then(user => {
            if (user) {
                return user;
            } else { // id not found
                this.router.navigate(['/home']);
                return false;
            }
        });
    }
}