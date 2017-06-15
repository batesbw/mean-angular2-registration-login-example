import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { PolicyService } from '../../_services/policy.service';

@Component({
    selector: 'app-policy-detail',
    moduleId: module.id,
    templateUrl: 'policy-detail.component.html'
})

export class PolicyDetailComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private policyService: PolicyService) { }

}
