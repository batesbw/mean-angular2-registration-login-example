import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { AccountComponent } from './account/account.component';
import { PolicyComponent } from './policy/policy.component';
import { PolicyCreateComponent } from './policy/policy-create.component';
import { UserDetailResolve } from './_services/user-detail.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
        children: [
          { path: 'account/:_id', component: AccountComponent, resolve: { user: UserDetailResolve } },
          { path: 'account', component: AccountComponent},
          { path: 'policy', component: PolicyComponent },
          { path: 'policy-create', component: PolicyCreateComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserDetailResolve
  ]
})

export class AppRoutingModule {}