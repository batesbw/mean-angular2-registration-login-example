import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, PolicyService } from '../_services/index';
import { PolicyComponent } from './policy.component';

@Component({
    selector: 'app-policy-create',
    moduleId: module.id,
    templateUrl: 'policy-create.component.html'
})

export class PolicyCreateComponent {
    model: any = {};
    loading = false;
    showCreatePolicyFlag: boolean; 

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private policyService: PolicyService) { }
    
    register() {
        this.loading = true;
        this.policyService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('New Policy Created', true);
                    //this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        this.loading = false;
    }
}
