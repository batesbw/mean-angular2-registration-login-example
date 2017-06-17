import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from '../account/account.component';
import { PolicyComponent } from '../policy/policy.component';
import { AuthGuard } from '../_guards/auth.guard';
import { HomeComponent } from './home.component';
import { PolicyCreateComponent } from '../policy/policy-create.component';

export const HOME_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'policy', component: PolicyComponent } ,
      { path: 'account', component: AccountComponent},
      { path: 'policy-create', component: PolicyCreateComponent },
    ] 
    }
];