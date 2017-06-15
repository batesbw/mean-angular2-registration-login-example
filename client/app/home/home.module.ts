import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PolicyModule } from './policy/policy.module';
import { PolicyService } from '../_services/policy.service';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PolicyModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        PolicyService
    ]
})

export class HomeModule {}