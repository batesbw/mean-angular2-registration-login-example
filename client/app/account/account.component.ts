import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { User } from '../_models/index';
import { UserResolveService } from '../_services/user-resolve.service';

@Component({
    selector: 'app-account',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    model: any = {};
    loading = false;
    @Input() currentUser: User;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService) { }
    
    onSubmit(form: NgForm) {
            // Edit
            this.currentUser.firstName = form.value.firstName;
            this.currentUser.lastName = form.value.lastName;
            this.currentUser.email = form.value.email;
            this.userService.update(this.currentUser)
                .subscribe(
                    data => {
                        this.alertService.success('Update successful', false);
                    },
                    error => {
                        this.alertService.error(error._body);
                    });
        this.router.navigateByUrl('/home');
    }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.currentUser = data.user
        });
    }
}
