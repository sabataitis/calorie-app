import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";
import {UserService} from "../shared/services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.service";
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './home/components/products/products.component';
import {NgChartsModule} from "ng2-charts";
import { PieComponent } from './charts/pie/pie.component';
import { NonAuthHeaderComponent } from './home/components/non-auth-header/non-auth-header.component';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductsComponent,
    PieComponent,
    NonAuthHeaderComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgChartsModule,
    ],
    exports: [NavbarComponent],
  providers: [AuthService, ApiService, UserService],
})
export class FeaturesModule { }
