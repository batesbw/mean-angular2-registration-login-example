import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { User } from '../_models/index';
import { User2Service } from '../_services/user2.service';

@Component({
    selector: 'app-account',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    loading = false;
    currentUser: any;
    another: any;
    user_id = JSON.parse(localStorage.getItem('currentUser'))._id;
    userForm: FormGroup


    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private user2Service: User2Service,
        private location: Location,
        private route: ActivatedRoute) {
        }
    
    onSubmit() {
        this.currentUser = this.prepareUser();
        this.userService.update(this.currentUser)
            .subscribe(
                data => {
                    this.alertService.success('Update successful', false);
                },
                error => {
                    this.alertService.error(error._body);
                });
        let currentUser = this.userService.getById(this.user_id);
        //localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigateByUrl('/home'); 
    }

    ngOnInit(): void {
        this.route.data
        .subscribe(
            (data: {  }) => {
                this.currentUser = data;
                this.currentUser = this.currentUser.user;
                console.log(this.currentUser);
        });
        this.createForm();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: [this.currentUser.firstName, Validators.required],
            lastName: [this.currentUser.lastName, Validators.required],
            email: [this.currentUser.email, Validators.required]
        })
    }

    prepareUser(): User {
        const formModel = this.userForm.value;

        const saveUser: User = {
            firstName: formModel.firstName as string,
            lastName: formModel.lastName as string,
            email: formModel.email as string,
            _id: this.user_id
        }
        return saveUser;
    }
}
