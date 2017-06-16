import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountComponent } from '../account/index';

import { UserService } from '../_services/user.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        AccountComponent
    ],
    exports: [ 
        AccountComponent
    ],
    providers: [
        UserService
    ]
})

export class AccountModule { }