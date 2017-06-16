import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { AccountComponent } from './account/account.component';
import { PolicyComponent } from './policy/policy.component';
import { PolicyCreateComponent } from './policy/policy-create.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
        children: [
          { path: 'account', component: AccountComponent },
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
  ]
})

export class AppRoutingModule {}