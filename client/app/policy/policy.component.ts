import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, PolicyService } from '../_services/index';
import { HomeComponent } from '../home/home.component';
import { PolicyCreateComponent } from './policy-create.component';

@Component({
    selector: 'app-policy',
    moduleId: module.id,
    templateUrl: 'policy.component.html'
})

export class PolicyComponent {
    model: any = {};
    loading = false;
    showCreatePolicyFlag: boolean; 

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private policyService: PolicyService) { }
    
    showCreatePolicy() {
        this.showCreatePolicyFlag = true;
    }
}
