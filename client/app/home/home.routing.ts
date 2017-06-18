import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from '../account/account.component';
import { PolicyComponent } from '../policy/policy.component';
import { AuthGuard } from '../_guards/auth.guard';
import { HomeComponent } from './home.component';
import { PolicyCreateComponent } from '../policy/policy-create.component';
import { UserResolveService } from '../_services/user-resolve.service';

export const HOME_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: { user: UserResolveService },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'policy', component: PolicyComponent } ,
      { path: 'account', component: AccountComponent, resolve: { user: UserResolveService }},
      { path: 'policy-create', component: PolicyCreateComponent },
    ] 
    }
];
