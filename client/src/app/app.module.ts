import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FeaturesModule} from "./features/features.module";
import {AppRoutingModule} from "./app-routing.module";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreEffects} from "./store/effects";
import {StoreReducer} from "./store/reducer";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {ToastrStoreModule} from "./store/toastr/toastr-store.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/interceptors/auth.interceptor";
import {ErrorInterceptor} from "./shared/interceptors/error.interceptor";
import {AuthGuard} from "./shared/guards/auth-guard.service";
import {LoginGuard} from "./shared/guards/login-guard.service";
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    FeaturesModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({store: StoreReducer}),
    EffectsModule.forRoot([StoreEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ToastrStoreModule,
    ToastrModule.forRoot(),
    NgChartsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    LoginGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})

export class AppModule {
}
