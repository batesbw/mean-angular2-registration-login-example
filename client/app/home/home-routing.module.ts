import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PolicyListComponent } from './policy/policy-list.component';
import { PolicyDetailComponent } from './policy/policy-detail.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../_guards/auth.guard';
import { RegisterComponent } from '../register/register.component';
import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../login/login.component';

const homeRoutes: Routes = [
    { path: 'home', component: HomeComponent,
      children: [
        { path: 'policy-list', component: PolicyListComponent },
        { path: 'policy-detail', component: PolicyDetailComponent},
        { path: 'account', component: AccountComponent}
      ]},

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }