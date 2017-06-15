import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PolicyService } from '../../_services/policy.service';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';

@Component({
    selector: 'app-policy-list',
    moduleId: module.id,
    templateUrl: 'policy-list.component.html'
})

export class PolicyListComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private policyService: PolicyService) { }

}
