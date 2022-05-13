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
import {EnteredProductService} from "../shared/services/entered-product.service";
import {CategoryService} from "../shared/services/category.service";

@Injectable()
export class StoreEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private categoryService: CategoryService,
    private userService: UserService,
    private productService: ProductService,
    private enteredProductService: EnteredProductService,
    private router: Router,
  ) {}

  getUserPolarChart$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getUserPolarChart),
      switchMap(({payload}) =>
        this.userService.polarChart(payload).pipe(
          map((response: any) => StoreActions.getUserPolarChartSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.getUserPolarChartFailure(error))),
        ),
      ),
    ),
  );
  getUserBarChart$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getUserBarChart),
      switchMap(({payload}) =>
        this.userService.barChart(payload).pipe(
          map((response: any) => StoreActions.getUserBarChartSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.getUSerBarChartFailure(error))),
        ),
      ),
    ),
  );
  removeUserProduct$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.removeUserProduct),
      switchMap(({payload}) =>
        this.enteredProductService.delete(payload).pipe(
          map((response: any) => StoreActions.removeUserProductSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.removeUserProductFailure(error))),
        ),
      ),
    ),
  );
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
      tap(()=> this.router.navigate(['/prisijungti'])),
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
        this.router.navigate(['/paieska']);
      })
  ), {dispatch: false})

  loginFailure$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.loginFailure),
      map((error: HttpException | any)=>{
        if(error.statusCode === 401 || error.status === 401){
          return ToastrActions.showError({message: 'Neteisingi prisijungimai. Bandykite dar kartą'})
        }
        return ToastrActions.showError({message: 'Prisijungti nepavyko, bandykite vėliau.'})
      }
      ),
    ))

  logout$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.logout),
      tap(action=>{
        this.authService.removeSession();
        this.router.navigate(['/']);
        // window.location.reload();
      })
      ), {dispatch: false}
    )

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
      switchMap(({payload})=>
        this.productService.findAll(payload).pipe(
          switchMap((response: any)=> [
            StoreActions.getProductsSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.getProductsFailure(error)))
        )
      )
    ))

  addProduct$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.addProduct),
      switchMap(({payload})=>
        this.productService.create(payload).pipe(
          switchMap((response: any)=> [
            StoreActions.addProductSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.addProductFailure(error)))
        )
      )
    ))

  getEarliestInvoiceDate$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.getEarliestInvoiceDate),
      switchMap(()=>
        this.userService.getEarliestEntryDate().pipe(
          switchMap((response: Date)=> [
            StoreActions.getEarliestInvoiceDateSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.getEarliestInvoiceDateFailure(error)))
        )
      )
    ))

  addProductSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.addProductSuccess),
      map(()=>
        ToastrActions.showSuccess({message: 'Produktas sėkmingai pridėtas.'})
      ),
      tap(()=> window.location.reload()),
    ));

  enterProducts$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.enterProducts),
      switchMap(({payload})=>
        this.enteredProductService.create(payload).pipe(
          switchMap((response: any)=> [
            StoreActions.enterProductsSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.enterProductsFailure(error)))
        )
      )
    ))

  enterProductsSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.enterProductsSuccess),
      map(()=>
        ToastrActions.showSuccess({message: 'Sėkmingai išsaugota.'}),
      ),
      tap(()=> this.router.navigate(['/apzvalga'])),
    ))

  getUserProducts$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.getUserProducts),
      switchMap(({payload})=>
        this.userService.products(payload).pipe(
          switchMap((response: any)=> [
            StoreActions.getUserProductsSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.getUserProductsFailure(error)))
        )
      )
    ))

  updateEnteredProduct$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.updateEnteredProduct),
      switchMap(({payload})=>
        this.enteredProductService.update(payload.update).pipe(
          switchMap((response: any)=> [
            StoreActions.updateEnteredProductSuccess({response}),
          ]),
          catchError((error: HttpException)=> of(StoreActions.updateEnteredProductFailure(error)))
        )
      )
    ))
  updateProfile$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.updateProfile),
      switchMap(({payload}) =>
        this.userService.update(payload).pipe(
          map((response: any) => StoreActions.updateProfileSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.updateProfileFailure(error))),
        ),
      ),
    ),
  );

  updateProfileSuccess$ = createEffect(()=>
    this.actions.pipe(
      ofType(StoreActions.updateProfileSuccess),
      map(()=>
        ToastrActions.showSuccess({message: 'Vartotojas atnaujintas.'}),
      ),
    ))

  getCategories$ = createEffect(() =>
    this.actions.pipe(
      ofType(StoreActions.getCategories),
      switchMap(() =>
        this.categoryService.categories().pipe(
          map((response: any) => StoreActions.getCategoriesSuccess({ response })),
          catchError((error: HttpException) => of(StoreActions.getCategoriesFailure(error))),
        ),
      ),
    ),
  );
}
