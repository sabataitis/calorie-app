import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchContainerComponent} from "./features/search-screen/containers/search-container/search-container.component";
import {RegisterComponent} from "./features/register/register.component";
import {LoginComponent} from "./features/login/login.component";
import {ProfileComponent} from "./features/review-screen/profile.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";
import {LoginGuard} from "./shared/guards/login-guard.service";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'paieska',
  },
  {
    path: 'paieska',
    component: SearchContainerComponent
  },
  {
    path: 'registracija',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'prisijungimas',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'apzvalga',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
