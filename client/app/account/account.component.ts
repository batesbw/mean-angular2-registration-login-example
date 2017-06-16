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
    @Input() savedUser: User;
    userForm: FormGroup
    

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(this.currentUser);
            this.savedUser = JSON.parse(localStorage.getItem('currentUser'));
            this.createForm();
        }
    
    onSubmit() {
            this.savedUser = this.prepareUser();
            this.userService.update(this.savedUser)
                .subscribe(
                    data => {
                        this.alertService.success('Update successful', false);
                    },
                    error => {
                        this.alertService.error(error._body);
                    });
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigateByUrl('/home'); 
    }

    ngOnInit() {

    }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: [this.savedUser.firstName, Validators.required],
            lastName: [this.savedUser.lastName, Validators.required],
            email: [this.savedUser.email, Validators.required]
        })
    }

    prepareUser(): User {
        const formModel = this.userForm.value;

        const saveUser: User = {
            firstName: formModel.firstname as string,
            lastName: formModel.firstname as string,
            email: formModel.firstname as string,
            _id: this.currentUser._id
        }
        console.log(saveUser);
        return saveUser;
    }
}
