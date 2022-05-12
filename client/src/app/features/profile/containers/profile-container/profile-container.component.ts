import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CategoryState, ProductState, UserState} from "../../../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../../../store";
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {enterAnimation} from "../../../../shared/animations/enter";
import {AddProductDTO} from "../../../../shared/dto/add-product.dto";
import {CreateProductDTO} from "../../../../shared/dto/create-product.dto";

@Component({
  selector: 'calorie-app-profile',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  animations: [
    enterAnimation
  ]
})
export class ProfileContainerComponent implements OnInit {
  userState$: Observable<UserState>
  categoryState$: Observable<CategoryState>
  productsState$: Observable<ProductState>

  isUpdatingProfile: boolean = false;
  isAddingProduct: boolean = false;

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
    this.categoryState$ = this.store.select(StoreSelectors.selectCategoryState);
    this.productsState$ = this.store.select(StoreSelectors.selectProductState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getCategories());
    this.store.dispatch(StoreActions.getProducts({payload: {options: {component: 'profile'}}}));
  }

  toggleEdit(): void {
    this.isAddingProduct = false;
    this.isUpdatingProfile = !this.isUpdatingProfile;
  }

  toggleAddProduct(): void {
    this.isUpdatingProfile = false;
    this.isAddingProduct = !this.isAddingProduct;
  }

  updateProfile(event: Partial<AuthUserDTO>): void {
    this.store.dispatch(StoreActions.updateProfile({payload: event}));
    this.isUpdatingProfile = false;
  }

  addNewProduct(event: AddProductDTO) {
    let payload: CreateProductDTO;
    if(!event.isMeal){
      payload = {
        name: event.name,
        category: event.category,
        isMeal: event.isMeal,
        nutrients: {
          calories: Math.abs(event.calories),
          proteins: Math.abs(event.proteins),
          carbs: Math.abs(event.carbs),
          fats: Math.abs(event.fats),
        },
        quantities: {
          quantity_g: event.measurementByUnit ? null : 100,
          unit_g: event.measurementByUnit ? Math.abs(event.measurementByUnit) : null
        }
      }
      this.store.dispatch(StoreActions.addProduct({payload}))
    } else{
      payload = {
        name: event.name,
        category: event.category,
        isMeal: event.isMeal,
        nutrients:{
          calories: Math.abs(event.totals.calories),
          proteins: Math.abs(event.totals.proteins),
          carbs: Math.abs(event.totals.carbs),
          fats: Math.abs(event.totals.fats),
        },
        quantities: {
          quantity_g: Math.abs(event.totals.grams),
          unit_g: Math.abs(event.mealPortionSize),
        }
      }
      this.store.dispatch(StoreActions.addProduct({payload}))
    }
  }
}
