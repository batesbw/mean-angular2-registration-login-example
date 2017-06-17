import { Component, Input, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService } from '../_services/alert.service';

@Component({
    selector:'home-component',
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    //user variables
    @Input() currentUser: User;
    currentUser_id = JSON.parse(localStorage.getItem('currentUser'))._id;
    users: User[] = [];

    //primary constructor
    constructor(private userService: UserService, private alertService: AlertService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    //initialisation method
    ngOnInit() {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userService.getById(this.currentUser_id)
            .subscribe(
                data => {
                    this.currentUser = data
                },
                error => {
                    this.alertService.error(error._body);
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