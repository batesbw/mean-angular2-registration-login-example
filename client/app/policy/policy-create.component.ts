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
    /* FOR LATER USE - need this in a dropdown
    coverTypes = [
        {name: 'C01 - New single dwelling construction'},
        {name: 'C02 - Multiple Dwellings Alterations / Additions – Structural'},
        {name: 'C03 - New Multiple Dwellings Construction (&lt;= 3 storeys)'},
        {name: 'C04 - Single Dwelling Alterations / Additions - Structural'},
        {name: 'C05 - Swimming Pools'},
        {name: 'C06 - Single Dwelling Renovations - Non Structural'},
        {name: 'C07 - Other'},
        {name: 'C08 - Multiple Dwellings Renovations - Non Structural'},
        {name: 'C09 - New Duplex, Dual Occupancy, Triplex or Terrace (Attached) Construction'}                                          
    ];*/

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private policyService: PolicyService) { }
    
    
    createPolicy() {
        this.loading = true;
        this.policyService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('New Policy Created', true);
                    this.router.navigate(['/policy']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        this.loading = false;
    }

}
