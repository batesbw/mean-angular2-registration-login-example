import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    selector:'home-component',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    //user variables
    currentUser: User;
    users: User[] = [];

    //account variables
    showAccount: boolean;

    //policy variables
    showPolicy: boolean;

    //primary constructor
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    //initialisation method
    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    //user methods
    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    //account methods
    receiveAccountEvent($event: any) {
        this.showAccount = $event;
    }

    showAccountDetail() {
        this.showAccount = true;
    }

    //policy methods
    showPolicyDetail() {
        this.showPolicy = true;
    }
}