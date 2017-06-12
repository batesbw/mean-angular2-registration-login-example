import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { User } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent {
    model: any = {};
    loading = false;
    currentUser: User;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }

}
