import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './index';

import { UserService } from '../_services/user.service';
import { AccountModule } from '../account/account.module';
import { PolicyModule } from '../policy/policy.module';

@NgModule({
    imports: [
        FormsModule,
        AccountModule,
        PolicyModule,
        RouterModule
    ],
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        UserService
    ]
})

export class HomeModule { }