import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProductState, UserState} from "../../../../store/state";
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {Store} from "@ngrx/store";
import {StoreActions, StoreSelectors} from "../../../../store";
import {ProductDTO} from "../../../../shared/dto/product.dto";
import {NutrientsType, QUANTITY_SELECTION, SelectedProductDTO} from "../../../../shared/dto/selected-product.dto";
import {TotalsDTO} from "../../../../shared/dto/totals.dto";
import {ChartSizeDTO} from "../../../../shared/dto/chart-size.dto";
import {ChartDataType, createPieChartData} from "../../../../shared/utils/create-pie-chart-data";
import {pieChartBgColors} from "../../../../shared/constants/pie-chart-bg-colors";
import {enterAnimation} from "../../../../shared/animations/enter";
import {NutrientLabelsConst} from "../../../../shared/constants/nutrient-labels.const";

@Component({
  selector: 'calorie-app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
  animations: [
    enterAnimation
  ]
})
export class SearchContainerComponent implements OnInit {
  userState$: Observable<UserState>;
  productState$: Observable<ProductState>;
  isAuthenticated = false;
  user: AuthUserDTO = null;
  products: ProductDTO[] = [];

  term: string = "";
  selectedProduct: SelectedProductDTO;
  selectedProducts: SelectedProductDTO[] = [];

  totals: TotalsDTO = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  }

  pieChartSize: ChartSizeDTO = {
    width: '18rem',
    height: '10rem'
  }

  chartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
    }
  };

  chartData: BehaviorSubject<ChartDataType> = new BehaviorSubject<ChartDataType>(
    {
      labels: NutrientLabelsConst,
      datasets: [{
        data: [0, 0, 0]
      }
      ]
    }
  );

  constructor(private store: Store) {
    this.userState$ = this.store.select(StoreSelectors.selectUserState);
    this.productState$ = this.store.select(StoreSelectors.selectProductState);
  }

  ngOnInit(): void {
    this.store.dispatch(StoreActions.getProducts());
    this.subscribeToUserState();
    this.subscribeToProductState();
  }

  productChange(term: string) {
    this.selectedProduct = this.getSelectedProductByName(term);
    if (Object.keys(this.selectedProduct).length > 0) {
      this.selectedProducts.push(this.selectedProduct);
      this.calculateTotals();
      this.term = "";
    }
  }

  calculateTotals(): void {
    this.totals = {calories: 0, proteins: 0, carbs: 0, fats: 0};
    this.selectedProducts.forEach((product: SelectedProductDTO) => {
      this.totals.calories += product.nutrients.calories;
      this.totals.proteins += product.nutrients.proteins;
      this.totals.carbs += product.nutrients.carbs;
      this.totals.fats += product.nutrients.fats;
    })
    this.updatePieChart();
  }

  calculateNutrients(measurement: string, product: ProductDTO, selectedProduct: SelectedProductDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for (const nutrient in selectedProduct.nutrients) {
        selectedProduct.nutrients[nutrient as keyof NutrientsType] = Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for (const nutrient in selectedProduct.nutrients) {
        selectedProduct.nutrients[nutrient as keyof NutrientsType] = Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.units * product.quantities.unit_g / 100)).toFixed(2));
      }
    }
  }

  quantityChange(selectedProduct: SelectedProductDTO) {
    const product = this.products.find(product => product._id === selectedProduct.productId);
    switch (selectedProduct.quantity.selected) {
      case QUANTITY_SELECTION.GRAM:
        this.calculateNutrients(QUANTITY_SELECTION.GRAM, product, selectedProduct);
        break;
      case QUANTITY_SELECTION.UNIT:
        this.calculateNutrients(QUANTITY_SELECTION.UNIT, product, selectedProduct);
        break;
    }
    this.calculateTotals();
  }

  removeItem(index: number) {
    this.selectedProducts.splice(index, 1);
    this.calculateTotals();
  }

  enterProducts() {
    const payload = {
      userId: this.user._id,
      products: this.selectedProducts
    }
    this.store.dispatch(StoreActions.enterProducts({payload}));
  }

  private updatePieChart(): void {
    this.chartData.next({
      ...this.chartData.value,
      datasets: [{
        data: [this.totals.proteins, this.totals.carbs, this.totals.fats],
      }]
    })
  }

  private getSelectedProductByName(selectedName: string): SelectedProductDTO {
    const product = this.products.find(product => product.name === selectedName);

    return {
      productId: product._id,
      productName: product.name,
      nutrients: {
        ...product.nutrients
      },
      quantity: {
        hasUnits: !!product.quantities.unit_g,
        selected: QUANTITY_SELECTION.GRAM,
        grams: product.quantities.quantity_g,
        units: product.quantities.unit_g ? 1 : null
      }
    }
  }

  private subscribeToUserState(): void {
    this.userState$.subscribe((userState: UserState) => {
      if (userState.success) {
        this.isAuthenticated = userState.user.isAuthenticated;
        this.user = userState.user;
      }
    })
  }

  private subscribeToProductState(): void {
    this.productState$.subscribe((productState: ProductState) => {
      if (productState.success) {
        this.products = productState.products;
      }
    })
  }
}
