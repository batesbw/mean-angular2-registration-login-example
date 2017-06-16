import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { PolicyCreateComponent } from './policy-create.component';
import { PolicyComponent } from './policy.component';
import { PolicyService } from '../_services/policy.service';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        PolicyComponent,
        PolicyCreateComponent
    ],
    exports: [ 
        PolicyComponent,
        PolicyCreateComponent
    ],
    providers: [
        PolicyService
    ]
})

export class PolicyModule { }