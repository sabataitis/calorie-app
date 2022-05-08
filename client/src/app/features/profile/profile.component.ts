import {Component, OnInit} from '@angular/core';
import {UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {Observable} from "rxjs";
import {UserProductDTO, UserProductListDTO} from "../../shared/dto/user-product.dto";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {NutrientsType, QUANTITY_SELECTION} from "../../shared/dto/selected-product.dto";

@Component({
  selector: 'calorie-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>;
  userProducts: UserProductListDTO[];
  user: AuthUserDTO;

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts());
    this.subscribeToUserState();
  }

  trackByIndex(index: number, object: any): number {
    return index;
  }

  getQuantityAndMeasurement(product: UserProductDTO): any{
    switch(product.quantity.selected){
      case QUANTITY_SELECTION.UNIT:
        return {
          quantity: product.quantity.units,
          measurement: 'vnt'
        }
      case QUANTITY_SELECTION.GRAM:
        return {
          quantity: product.quantity.grams,
          measurement: 'g'
        }
    }
  }

  toggleEditMode(product: UserProductListDTO){
    product.editMode = !product.editMode;
    if(product.changesMade){
      const update = {_id: product._id, nutrients: product.nutrients, quantity: product.quantity};
      this.store.dispatch(StoreActions.updateEnteredProduct({payload: {products: this.userProducts, update}}))
    }
  }

  calculateNutrients(measurement: string, product: UserProductListDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for(const nutrient in product.productId.nutrients){
        product.nutrients[nutrient as keyof NutrientsType]= Number((product.productId.nutrients[nutrient as keyof NutrientsType] * (product.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for(const nutrient in product.productId.nutrients){
        product.nutrients[nutrient as keyof NutrientsType]= Number((product.productId.nutrients[nutrient as keyof NutrientsType] * product.quantity.units * product.productId.quantities.unit_g / 100).toFixed(2));
      }
    }
  }

  quantityChange(product: UserProductListDTO) {
    product.changesMade = true;
    switch (product.quantity.selected) {
      case QUANTITY_SELECTION.GRAM:
        this.calculateNutrients(QUANTITY_SELECTION.GRAM, product);
        break;
      case QUANTITY_SELECTION.UNIT:
        this.calculateNutrients(QUANTITY_SELECTION.UNIT, product);
        break;
    }
    // TODO add totals someplace
    // this.calculateTotals();
  }


  private subscribeToUserState(): void{
    this.userState$.subscribe((userState: UserState)=>{
      if(userState.user.isAuthenticated){
        this.userProducts = JSON.parse(JSON.stringify(userState.products.map((product: UserProductDTO)=>{
          return product;
        })));
        this.user = userState.user;
      }
    })
  }

}
