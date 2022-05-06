import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ToasterEffects } from './effects';
import {ToastrService} from "ngx-toastr";

@NgModule({
  imports: [
    EffectsModule.forFeature([ToasterEffects])
  ],
  providers: [
    ToastrService
  ]
})
export class ToastrStoreModule { }
