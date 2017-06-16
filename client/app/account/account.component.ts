import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { AlertService, UserService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { User } from '../_models/index';

@Component({
    selector: 'app-account',
    moduleId: module.id,
    templateUrl: 'account.component.html'
})

export class AccountComponent implements OnInit {
    loading = false;
    @Input() currentUser: User;
    user_id = JSON.parse(localStorage.getItem('currentUser'))._id;
    userForm: FormGroup

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder) {
            //this.createForm();
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
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.router.navigateByUrl('/home'); 
    }

    ngOnInit() {
        this.userService.getById(this.user_id).subscribe(user => { this.currentUser = user;}, error => {this.alertService.error(error._body);});
        console.log(this.currentUser);
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
