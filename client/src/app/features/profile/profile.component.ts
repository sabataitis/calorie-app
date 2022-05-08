import {Component, OnInit} from '@angular/core';
import {UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {Observable} from "rxjs";
import {UserProductDTO, UserProductListDTO} from "../../shared/dto/user-product.dto";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {NutrientsType, QUANTITY_SELECTION} from "../../shared/dto/selected-product.dto";
import {format, sub} from 'date-fns';

@Component({
  selector: 'calorie-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>;
  userProducts: UserProductListDTO[];
  user: AuthUserDTO;

  currentDate: string = format(new Date(), "yyyy-MM-dd");
  threeDaysBeforeDate: string = format(sub(new Date(this.currentDate), {
    days: 2
  }), "yyyy-MM-dd");

  dateInput: string = this.currentDate;
  showProducts: boolean = false;

  totals = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  }

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date: this.currentDate}}));
    this.subscribeToUserState();
  }

  toggleProducts(): void{
    this.showProducts = !this.showProducts;
  }


  trackByIndex(index: number, object: any): number {
    return index;
  }

  changeDate(date: string){
    this.store.dispatch(StoreActions.getUserProducts({payload: {date}}));
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
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totals = {calories: 0, proteins: 0, carbs: 0, fats: 0};

    this.userProducts.forEach((product: UserProductListDTO) => {
      this.totals.calories += product.nutrients.calories;
      this.totals.proteins += product.nutrients.proteins;
      this.totals.carbs += product.nutrients.carbs;
      this.totals.fats += product.nutrients.fats;
    })
  }


  private subscribeToUserState(): void{
    this.userState$.subscribe((userState: UserState)=>{
      if(userState.user.isAuthenticated){
        this.userProducts = JSON.parse(JSON.stringify(userState.products.map((product: UserProductDTO)=>{
          return product;
        })));
        this.user = userState.user;
        this.calculateTotals();
      }
    })
  }

}
