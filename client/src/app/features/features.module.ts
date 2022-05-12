import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchContainerComponent } from './search-screen/containers/search-container/search-container.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "../shared/services/api.service";
import {UserService} from "../shared/services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../shared/services/auth.service";
import { ReviewScreenComponent } from './review-screen/review-screen.component';
import {NgChartsModule} from "ng2-charts";
import { PieComponent } from './shared/charts/pie/pie.component';
import { NonAuthHeaderComponent } from './search-screen/components/non-auth-header/non-auth-header.component';
import { TotalsRowComponent } from './shared/totals-row/totals-row.component';
import { SelectProductListComponent } from './shared/select-product-list/select-product-list.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import {UserProductListComponent} from "./shared/user-product-list/user-product-list.component";
import {PolarAreaComponent} from "./shared/charts/polar-area/polar-area.component";
import {BarChartComponent} from "./shared/charts/bar-chart/bar-chart.component";
import {LineChartComponent} from "./shared/charts/line-chart/line-chart.component";
import { ProfileContainerComponent } from './profile/containers/profile-container/profile-container.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserInfoComponent } from './profile/components/user-info/user-info.component';
import { EditUserComponent } from './profile/components/edit-user/edit-user.component';
import { AddProductComponent } from './profile/components/add-product/add-product.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchContainerComponent,
    LoginComponent,
    RegisterComponent,
    ReviewScreenComponent,
    PieComponent,
    PolarAreaComponent,
    BarChartComponent,
    LineChartComponent,
    NonAuthHeaderComponent,
    TotalsRowComponent,
    SelectProductListComponent,
    UserProductListComponent,
    SearchBarComponent,
    ProfileContainerComponent,
    PageNotFoundComponent,
    UserInfoComponent,
    EditUserComponent,
    AddProductComponent,
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
