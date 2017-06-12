import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { User } from '../_models/index';

@Component({
    selector: 'app-account',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    model: any = {};
    loading = false;
    @Input() currentUser: User;

    showAccount: boolean = false;
    @Output() showAccountEvent = new EventEmitter<boolean>();

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
            //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    
    onSubmit(form: NgForm) {
            // Edit
            this.currentUser.firstName = form.value.firstName;
            this.currentUser.lastName = form.value.lastName;
            this.currentUser.email = form.value.email;
            this.userService.update(this.currentUser)
                .subscribe(
                    result => console.log(result)
                );
            this.showAccountEvent.emit(this.showAccount)
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    ngOnInit() {
        this.userService.userIsEdit.subscribe(
            (currentUser: User) => this.currentUser = currentUser
        );
    }
}
