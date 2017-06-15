import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { PolicyListComponent } from './policy-list.component';
import { PolicyDetailComponent } from './policy-detail.component';
import { PolicyService } from '../../_services/policy.service';
import { RouterModule } from '@angular/router';


@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PolicyListComponent,
        PolicyDetailComponent
    ],
    providers: [
        PolicyService
    ]
})

export class PolicyModule {}