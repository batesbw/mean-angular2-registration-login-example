import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from '../account/index';

import { UserService } from '../_services/user.service';
import { CommonModule } from '@angular/common';
import { User2Service } from '../_services/user2.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [
        AccountComponent
    ],
    exports: [ 
        AccountComponent
    ],
    providers: [
        UserService,
        User2Service
    ]
})

export class AccountModule { }