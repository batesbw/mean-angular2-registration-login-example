import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';

import { UserService } from './user.service';

@Injectable()
export class UserResolveService implements Resolve<any> {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<any> | any {
    let id = JSON.parse(localStorage.getItem('currentUser'))._id;
    return this.userService.getById(id).map(user => {
      if (user) {
        return user;
      } else { // id not found
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}