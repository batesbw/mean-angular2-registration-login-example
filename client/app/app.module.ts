import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './app.config';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, PolicyService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AccountComponent } from './account/index';
import { PolicyListComponent } from './home/policy/policy-list.component';
import { PolicyDetailComponent } from './home/policy/policy-detail.component';
import { HomeModule } from './home/home.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HomeModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        PolicyService,
        UserService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }