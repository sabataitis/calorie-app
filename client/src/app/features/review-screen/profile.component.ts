import {Component, OnInit} from '@angular/core';
import {CategoryGraphState, LinearGraphState, UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {BehaviorSubject, Observable} from "rxjs";
import {UserProductDTO, UserProductListDTO} from "../../shared/dto/user-product.dto";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {NutrientsType, QUANTITY_SELECTION} from "../../shared/dto/selected-product.dto";
import {format, sub} from 'date-fns';
import {enterAnimation} from "../../shared/animations/enter";
import {TotalsDTO} from "../../shared/dto/totals.dto";
import {ChartSizeDTO} from "../../shared/dto/chart-size.dto";
import {ChartData} from "chart.js";
import {NutrientLabelsConst} from "../../shared/constants/nutrient-labels.const";

@Component({
  selector: 'calorie-app-review-screen',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [enterAnimation]
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>;
  userCategoryGraphState$: Observable<CategoryGraphState>;
  userLinearGraphState$: Observable<LinearGraphState>;
  userProducts: UserProductListDTO[];
  user: AuthUserDTO;

  categoriesGraphData: BehaviorSubject<any> = new BehaviorSubject(
    {
      labels: [],
      datasets: [{data: []}]
    }
  )

  linearGraphData: BehaviorSubject<any> = new BehaviorSubject(
    {
      labels: [],
      datasets: [{data: []}]
    }
  )

  categoriesGraphSize: ChartSizeDTO = {
    width: '20rem',
    height: '20rem'
  };

  floatingBarGraphSize: ChartSizeDTO = {
    width: '40rem',
    height: '40rem'
  };

  floatingBarData: BehaviorSubject<ChartData<any>> = new BehaviorSubject<ChartData<any>>(
    {
      labels: NutrientLabelsConst,
      datasets: [{data: []}]
    }
  )

  currentDate: string = format(new Date(), "yyyy-MM-dd");
  threeDaysBeforeDate: string = format(sub(new Date(this.currentDate), {
    days: 2
  }), "yyyy-MM-dd");

  dateInput: string = this.currentDate;
  showProducts: boolean = false;

  totals: TotalsDTO = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  }

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
    this.userCategoryGraphState$ = this.store.select(StoreSelectors.selectUserCategoryGraphState);
    this.userLinearGraphState$ = this.store.select(StoreSelectors.selectUserLinearGraphState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date: this.currentDate}}));
    this.store.dispatch(StoreActions.getUserCategoryGraph({payload: {date: this.currentDate}}));
    this.store.dispatch(StoreActions.getUserLinearGraph({payload: {days: 3}}));
    this.subscribeToUserState();
    this.subscribeToGraphsState();
    this.subscribeToLinearGraphState();
  }

  toggleProducts(): void {
    this.showProducts = !this.showProducts;
  }

  changeDate(date: string) {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date}}));
    this.store.dispatch(StoreActions.getUserCategoryGraph({payload: {date}}));
  }

  toggleEditMode(product: UserProductListDTO) {
    product.editMode = !product.editMode;
    if (product.changesMade) {
      const update = {_id: product._id, nutrients: product.nutrients, quantity: product.quantity};
      this.store.dispatch(StoreActions.updateEnteredProduct({payload: {products: this.userProducts, update}}))
      this.store.dispatch(StoreActions.getUserCategoryGraph({payload: {date: this.currentDate}}));
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
    this.calculateTotals();
  }

  private calculateNutrients(measurement: string, product: UserProductListDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for (const nutrient in product.productId.nutrients) {
        product.nutrients[nutrient as keyof NutrientsType] = Number((product.productId.nutrients[nutrient as keyof NutrientsType] * (product.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for (const nutrient in product.productId.nutrients) {
        product.nutrients[nutrient as keyof NutrientsType] = Number((product.productId.nutrients[nutrient as keyof NutrientsType] * product.quantity.units * product.productId.quantities.unit_g / 100).toFixed(2));
      }
    }
  }

  private calculateTotals(): void {
    this.totals = {calories: 0, proteins: 0, carbs: 0, fats: 0};
    this.userProducts.forEach((product: UserProductListDTO) => {
      this.totals.calories += product.nutrients.calories;
      this.totals.proteins += product.nutrients.proteins;
      this.totals.carbs += product.nutrients.carbs;
      this.totals.fats += product.nutrients.fats;
    })
  }

  private subscribeToUserState(): void {
    this.userState$.subscribe((userState: UserState) => {
      if (userState.user.isAuthenticated) {
        this.user = userState.user;
        this.userProducts = JSON.parse(JSON.stringify(userState.products.map((product: UserProductDTO) => {
          return product;
        })));
        this.calculateTotals();
        this.floatingBarData.next({
          ...this.floatingBarData.value,
          datasets: [
            {
              label: 'Suvartota',
              data: [[0, this.totals.proteins], [0, this.totals.carbs], [0, this.totals.fats]]
            },
            {
              label: 'Rekomenduoja Paros Norma',
              data: [
                [this.user.recommendations.proteins.from, this.user.recommendations.proteins.to],
                [this.user.recommendations.carbs.from, this.user.recommendations.carbs.to],
                [this.user.recommendations.fats.from, this.user.recommendations.fats.to],
              ]
            }
          ]
        })
      }
    })
  }

  private subscribeToGraphsState(): void {
    this.userCategoryGraphState$.subscribe((categoryGraphState: CategoryGraphState) => {
      if (categoryGraphState.success) {
        this.categoriesGraphData.next({labels: [], datasets: [{data: []}]});

        let data: string[] = [];
        let labels: string[] = [];
        const graphs = categoryGraphState.data;
        if (graphs['caloriesByCategory']?.length) {
          graphs['caloriesByCategory'].forEach((category: any) => {
            data.push(category.sum);
            labels.push(category.name)
          })
          this.categoriesGraphData.next({labels, datasets: [{data}]})
        }
      }
    })
  }

  private subscribeToLinearGraphState(): void {
    this.userLinearGraphState$.subscribe((linearGraphState: LinearGraphState) => {
      if (linearGraphState.success) {
        console.log(linearGraphState.data);
        // this.categoriesGraphData.next({labels: [], datasets: [{data: []}]});
        //
        // let data: string[] = [];
        // let labels: string[] = [];
        // const graphs = categoryGraphState.data;
        // if(graphs['caloriesByCategory']?.length){
        //   graphs['caloriesByCategory'].forEach((category: any)=>{
        //     data.push(category.sum);
        //     labels.push(category.name)
        //   })
        //   this.categoriesGraphData.next({labels, datasets: [{data}]})
        // }
      }
    })
  }
}
