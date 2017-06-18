import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    //primary constructor
    constructor(
        private userService: UserService,
        private route: ActivatedRoute) { }

    //initialisation method
    ngOnInit() {
        this.route.data.forEach((data) => {
            this.currentUser = data.user
        });
    }

    //user methods
    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}