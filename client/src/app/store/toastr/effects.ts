import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, tap} from "rxjs";

import * as ToastrActions from './actions';
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ToasterEffects {
  @Effect({ dispatch: false })
  showError$ = this.actions.pipe(
    ofType(ToastrActions.showError),
    map((action: any) => action.message),
    tap((message: string) => {
      this.toastr.warning(message);
    })
  );

  @Effect({ dispatch: false })
  showInfo$ = this.actions.pipe(
    ofType(ToastrActions.showInfo),
    map((action: any) => action.message),
    tap((message: string) => {
      this.toastr.info(message);
    })
  );

  @Effect({ dispatch: false })
  showSuccess$ = this.actions.pipe(
    ofType(ToastrActions.showSuccess),
    tap((action:any) => {
      const { message } = action;
      this.toastr.success(message);
    })
  );
  constructor(private actions: Actions, private toastr: ToastrService) { }
}
