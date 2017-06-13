import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { PolicyService } from '../_services/index';

@Component ({
    selector: 'app-policy-list',
    moduleId: module.id,
    templateUrl: 'policy-list.component.html'
})

export class PolicyListComponent {
    data: any = {};
    public filterQuery = "";
    public rowsOnPage = 5;
    public sortBy = "postcode";
    public sortOrder = "asc";

    constructor(
        private http: Http,
        private policyService: PolicyService) {
    }

    ngOnInit(): void {
        this.policyService.getAll()
            .subscribe((response)=> {
                setTimeout(()=> {
                    this.data = response;
                }, 1000);
            });
        console.log(this.data);
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.postcode.length;
    }
}