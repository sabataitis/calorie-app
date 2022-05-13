import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  SearchContainerComponent
} from "./features/search-screen/containers/search-container/search-container.component";
import {RegisterComponent} from "./features/register/register.component";
import {LoginComponent} from "./features/login/login.component";
import {ReviewScreenComponent} from "./features/review-screen/review-screen.component";
import {AuthGuard} from "./shared/guards/auth-guard.service";
import {LoginGuard} from "./shared/guards/login-guard.service";
import {ProfileContainerComponent} from "./features/profile/containers/profile-container/profile-container.component";
import {PageNotFoundComponent} from "./features/page-not-found/page-not-found.component";
import {NonAuthHeaderComponent} from "./features/non-auth-header/non-auth-header.component";

const routes: Routes = [
  {
    path: '',
    component: NonAuthHeaderComponent,
    canActivate: [LoginGuard]
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
    path: 'paieska',
    component: SearchContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apzvalga',
    component: ReviewScreenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vartotojas',
    component: ProfileContainerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
