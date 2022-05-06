import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as StoreActions from './actions';
import {catchError, map, of, switchMap, tap} from "rxjs";
import {HttpException} from "../shared/interfaces/http-exception.interface";
import {UserService} from "../shared/services/user.service";
import {UserDTO} from "../shared/dto/user.dto";
import {Router} from "@angular/router";
import {ToastrActions} from './toastr/index';
import {AuthService} from "../shared/services/auth.service";
import {ProductService} from "../shared/services/product.service";

@Injectable()
export class StoreEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private router: Router,
  ) {}

  getUsernames$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getUsernames),
      switchMap(() =>
        this.userService.getUsernames().pipe(
          map((response: String[]) => StoreActions.getUsernamesSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.getUsernamesFailure(error))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.register),
      switchMap((payload: any) =>
        this.userService.register(payload).pipe(
          switchMap((response: Partial<UserDTO>) => [
            StoreActions.registerSuccess({ response }),
          ]),
          catchError((error: HttpException) => of(StoreActions.registerFailure(error))),
        ),
      ),
    ),
  );

  registerSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.registerSuccess),
      map(()=>
        ToastrActions.showSuccess({message: 'Registracija sėkminga! Prisijunkite.'}),
      ),
      tap(()=> this.router.navigate(['/'])),
    ))

  registerFailure$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.registerFailure),
      map(()=>
        ToastrActions.showError({message: 'Registracija nepavyko, bandykite vėliau.'}),
      ),
    ))
  login$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.login),
      switchMap((payload: any)=>
        this.authService.login(payload).pipe(
          switchMap((response: any)=> [
            StoreActions.loginSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.loginFailure(error)))
        )
      )
  ))
  loginSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.loginSuccess),
      tap((payload: any)=> {
        this.authService.setSession(payload);
        this.router.navigate(['/']);
      })
  ), {dispatch: false})

  loginFailure$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.loginFailure),
      map((error: HttpException | any)=>{
        console.log({error});
        if(error.statusCode === 401 || error.status === 401){
          return ToastrActions.showError({message: 'Neteisingi prisijungimai. Bandykite dar kartą'})
        }
        return ToastrActions.showError({message: 'Prisijungti nepavyko, bandykite vėliau.'})
      }
      ),
    ), {dispatch: false})

  getCurrentUser$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.getCurrentUser),
      switchMap(()=>
        this.authService.current().pipe(
          switchMap((response: any)=> [
            StoreActions.getCurrentUserSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.getCurrentUserFailure(error)))
        )
      )
    ))

  getProducts$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.getProducts),
      switchMap(()=>
        this.productService.findAll().pipe(
          switchMap((response: any)=> [
            StoreActions.getProductsSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.getProductsFailure(error)))
        )
      )
    ))
}
