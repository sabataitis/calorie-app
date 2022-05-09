import {Component, OnInit} from '@angular/core';
import {GraphsState, UserState} from "../../store/state";
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

@Component({
  selector: 'calorie-app-review-screen',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [enterAnimation]
})
export class ProfileComponent implements OnInit {
  userState$: Observable<UserState>;
  graphsState$: Observable<GraphsState>;
  userProducts: UserProductListDTO[];
  user: AuthUserDTO;

  categoriesGraphData: BehaviorSubject<any> = new BehaviorSubject(
    {
    labels: [],
    datasets: [{data: []}]
  }
  )

  categoriesGraphSize: ChartSizeDTO = {
    width: '20rem',
    height: '20rem'
  };

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
    this.graphsState$ = this.store.select(StoreSelectors.selectGraphsState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date: this.currentDate}}));
    this.store.dispatch(StoreActions.getUserGraphs({payload: {date: this.currentDate }}));
    this.subscribeToUserState();
    this.subscribeToGraphsState();
  }
  toggleProducts(): void{
    this.showProducts = !this.showProducts;
  }
  changeDate(date: string){
    this.store.dispatch(StoreActions.getUserProducts({payload: {date}}));
    this.store.dispatch(StoreActions.getUserGraphs({payload: {date }}));
  }
  toggleEditMode(product: UserProductListDTO){
    product.editMode = !product.editMode;
    if(product.changesMade){
      const update = {_id: product._id, nutrients: product.nutrients, quantity: product.quantity};
      this.store.dispatch(StoreActions.updateEnteredProduct({payload: {products: this.userProducts, update}}))
      this.store.dispatch(StoreActions.getUserGraphs({payload: {date: this.currentDate }}));
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
      for(const nutrient in product.productId.nutrients){
        product.nutrients[nutrient as keyof NutrientsType]= Number((product.productId.nutrients[nutrient as keyof NutrientsType] * (product.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for(const nutrient in product.productId.nutrients){
        product.nutrients[nutrient as keyof NutrientsType]= Number((product.productId.nutrients[nutrient as keyof NutrientsType] * product.quantity.units * product.productId.quantities.unit_g / 100).toFixed(2));
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
  private subscribeToUserState(): void{
    this.userState$.subscribe((userState: UserState)=>{
      if(userState.user.isAuthenticated){
        this.user = userState.user;
        this.userProducts = JSON.parse(JSON.stringify(userState.products.map((product: UserProductDTO)=>{
          return product;
        })));
        this.calculateTotals();
      }
    })
  }
  private subscribeToGraphsState(): void{
    this.graphsState$.subscribe((graphsState: GraphsState)=>{
      if(graphsState.success){
        this.categoriesGraphData.next({labels: [], datasets: [{data: []}]});

        let data: string[] = [];
        let labels: string[] = [];
        const graphs = graphsState.graphs;
        if(graphs['caloriesByCategory']?.length){
          graphs['caloriesByCategory'].forEach((category: any)=>{
             data.push(category.sum);
             labels.push(category.name)
          })
          this.categoriesGraphData.next({labels, datasets: [{data}]})
        }
      }
    })
  }
}
