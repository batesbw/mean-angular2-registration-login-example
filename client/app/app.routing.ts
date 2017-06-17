import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AccountComponent } from './account/index';
import { PolicyComponent, PolicyCreateComponent } from './policy/index';
import { AuthGuard } from './_guards/index';
import { HOME_ROUTES } from './home/home.routing';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    ...HOME_ROUTES,

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);