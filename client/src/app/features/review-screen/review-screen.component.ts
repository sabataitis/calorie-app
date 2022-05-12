import {Component, OnInit} from '@angular/core';
import {PolarChartState, BarChartState, UserState} from "../../store/state";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../store";
import {BehaviorSubject, Observable} from "rxjs";
import {UserProductDTO, UserProductListDTO} from "../../shared/dto/user-product.dto";
import {AuthUserDTO} from "../../shared/dto/user.dto";
import {NutrientsType, QUANTITY_SELECTION} from "../../shared/dto/selected-product.dto";
import {format, sub} from 'date-fns';
import {enterAnimation} from "../../shared/animations/enter";
import {TotalsDTO} from "../../shared/dto/totals.dto";
import {ChartData, ChartOptions} from "chart.js";
import {NutrientLabelsConst} from "../../shared/constants/nutrient-labels.const";
import {getLineChartOptions} from "../../shared/utils/get-line-chart-options";

@Component({
  selector: 'calorie-app-review-screen',
  templateUrl: './review-screen.component.html',
  styleUrls: ['./review-screen.component.scss'],
  animations: [enterAnimation]
})
export class ReviewScreenComponent implements OnInit {
  userState$: Observable<UserState>;
  polarChartState$: Observable<PolarChartState>;
  barChartState$: Observable<BarChartState>;
  userProducts: UserProductListDTO[];
  user: AuthUserDTO;

  polarChartData$: BehaviorSubject<any> = new BehaviorSubject(
    {
      labels: [],
      datasets: [{data: []}]
    }
  )

  barChartData$: BehaviorSubject<ChartData<any>> = new BehaviorSubject<ChartData<any>>(
    {
      labels: ['Paskutinių trijų dienų statistika'],
      datasets: [{data: []}]
    }
  )

  floatingChartData$: BehaviorSubject<ChartData<any>> = new BehaviorSubject<ChartData<any>>(
    {
      labels: NutrientLabelsConst,
      datasets: [{data: []}]
    }
  )

  lineChartData$: BehaviorSubject<any> = new BehaviorSubject(
    {
      labels: [],
      datasets: [{data: []}]
    }
  )
  lineChartOptions$: BehaviorSubject<ChartOptions<any>> = new BehaviorSubject<ChartOptions<any>>({});

  currentDate: string = format(new Date(), "yyyy-MM-dd");
  minDate: string = format(sub(new Date(this.currentDate), {
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
    this.polarChartState$ = this.store.select(StoreSelectors.selectPolarChartState);
    this.barChartState$ = this.store.select(StoreSelectors.selectBarChartState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date: this.currentDate}}));
    this.store.dispatch(StoreActions.getUserPolarChart({payload: {date: this.currentDate}}));
    this.store.dispatch(StoreActions.getUserBarChart({payload: {days: 2}}));
    this.subscribeToUserState();
    this.subscribeToPolarChartState();
    this.subscribeToBarChartState();
  }

  toggleProducts(): void {
    this.showProducts = !this.showProducts;
  }

  changeDate(date: string):void {
    this.store.dispatch(StoreActions.getUserProducts({payload: {date}}));
    this.store.dispatch(StoreActions.getUserPolarChart({payload: {date}}));
  }

  toggleEditMode(product: UserProductListDTO): void {
    product.editMode = !product.editMode;
    if (product.changesMade) {
      const update = {_id: product._id, nutrients: product.nutrients, quantity: product.quantity};
      this.store.dispatch(StoreActions.updateEnteredProduct({payload: {products: this.userProducts, update}}))
      this.store.dispatch(StoreActions.getUserPolarChart({payload: {date: this.currentDate}}));
    }
  }

  removeItem(product: UserProductListDTO): void{
    this.store.dispatch(StoreActions.removeUserProduct({payload: {id: product._id}}))
    this.store.dispatch(StoreActions.getUserProducts({payload: {date:this.dateInput}}));
  }

  quantityChange(product: UserProductListDTO): void {
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

  private createFloatingBarDatasets(totals: TotalsDTO, recommendations: any): any {
    return {
      datasets: [
        {
          label: 'Suvartota',
          data: [[0, totals.proteins], [0, totals.carbs], [0, totals.fats]]
        },
        {
          label: 'Rekomenduojama paros norma',
          data: [
            [recommendations.proteins.from, recommendations.proteins.to],
            [recommendations.carbs.from, recommendations.carbs.to],
            [recommendations.fats.from, recommendations.fats.to],
          ]
        },
      ]
    }
  }

  private createLineChartData(userProducts: UserProductDTO[]): any{
    const sumPreviousArr: any = userProducts.map((product: any, index: number) => {
      let sum = this.addPrevious(userProducts, index);
      return {x: product.createdAt, y: sum};
    })
    if(!sumPreviousArr.length){
      return {
        datasets: [],
        min: null,
        max: null,
      }
    } else{
      const min: string = sumPreviousArr[0].x;
      const max: string = sumPreviousArr[sumPreviousArr.length-1].x;
      const data = [{x: sumPreviousArr[0].x, y: 0}, ...sumPreviousArr];

      return {
        datasets: [{data}],
        min,
        max,
      }
    }
  }

  private subscribeToUserState(): void {
    this.userState$.subscribe((userState: UserState) => {
      if (userState.current.isAuthenticated) {
        if(userState.previous){
          this.user = userState.previous as AuthUserDTO;
        } else{
          this.user = userState.current;
        }
        this.userProducts = JSON.parse(JSON.stringify(userState.products.map((product: UserProductDTO) => {
          return product;
        })));
        this.calculateTotals();


        this.floatingChartData$.next({
          ...this.floatingChartData$.value,
          ...this.createFloatingBarDatasets(this.totals, this.user?.recommendations)
        })

        const {datasets, min, max}= this.createLineChartData(this.userProducts);
        this.lineChartData$.next({datasets});
        this.lineChartOptions$.next({...getLineChartOptions(min,max,this.dateInput)});
      }
    })
  }

  private subscribeToPolarChartState(): void {
    this.polarChartState$.subscribe((polarChartState: PolarChartState) => {
      if (polarChartState.success) {
        this.polarChartData$.next({labels: [], datasets: [{data: []}]});

        let data: string[] = [];
        let labels: string[] = [];
        const graphs = polarChartState.data;
        if (graphs['caloriesByCategory']?.length) {
          graphs['caloriesByCategory'].forEach((category: any) => {
            data.push(category.sum);
            labels.push(category.name)
          })
          this.polarChartData$.next({labels, datasets: [{data}]})
        }
      }
    })
  }
  private subscribeToBarChartState(): void{
    this.barChartState$.subscribe((barChartState: BarChartState)=>{
      if(barChartState.success){
        const datasets = barChartState.data.map((data:any)=>{
          return {data: [data.sum], label: format(new Date(new Date().getFullYear(), new Date().getMonth(), data.day), 'yyyy-MM-dd') }
        })
        datasets.push({data: [this.user.calories], label: 'Dienos tikslas (kcal)'})
        this.barChartData$.next({...this.barChartData$.value, datasets});
      }
    })
  }

  private addPrevious(arr: any, index: number) {
    let sum = arr[index].nutrients.calories;
    for (let i = 1; i <= index; i++) {
      sum += arr[i - 1].nutrients.calories;
    }
    return sum;
  }
}
