import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {ProductDTO} from "../../../../shared/dto/product.dto";

import {ChartData} from "chart.js";
import {BehaviorSubject} from "rxjs";
import {NutrientsType, QUANTITY_SELECTION, SelectedProductDTO} from "../../../../shared/dto/selected-product.dto";

@Component({
  selector: 'calorie-app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnChanges {
  @Input('user') user: AuthUserDTO;
  @Input('products') products: ProductDTO[];
  @Output() saveProductsEvent = new EventEmitter<SelectedProductDTO[]>();

  selectedProduct: SelectedProductDTO;
  selectedProducts: SelectedProductDTO[] = [];

  searchTerm: string = "";
  quantity: number;
  totals = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
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

  chartData: BehaviorSubject<ChartData<'pie', number[], string>> = new BehaviorSubject<ChartData<"pie", number[], string>>(
    {
      labels: ['Baltymai', 'Angliavandeniai', 'Riebalai'],
      datasets: [{
        label: 'my First dataset',
        data: [0, 0, 0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ]
      }],
    });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'].currentValue) {
      this.products = changes['products'].currentValue;
    }
  }

  trackByIndex(index: number, object: any): number {
    return index;
  }

  saveProducts(): void {
    this.saveProductsEvent.emit(this.selectedProducts);
  }

  removeItem(index: number) {
    this.selectedProducts.splice(index, 1);
    this.calculateTotals();
  }

  // getQuantity(index: number, measurement: string): number {
  //   if (measurement === QUANTITY_SELECTION.GRAM) {
  //     return this.selectedProducts[index].quantity.grams;
  //   }
  //   return this.selectedProducts[index].quantity.units;
  // }

  calculateNutrients(measurement: string, product: ProductDTO, selectedProduct: SelectedProductDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for(const nutrient in selectedProduct.nutrients){
        // let concatKey = nutrient.concat('_100g');
        selectedProduct.nutrients[nutrient as keyof NutrientsType]= Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.grams / 100)).toFixed(2));
      }
    } else {
      for(const nutrient in selectedProduct.nutrients){
        // let concatKey = nutrient.concat('_100g');
        selectedProduct.nutrients[nutrient as keyof NutrientsType]= Number((product.nutrients[nutrient as keyof NutrientsType] * (selectedProduct.quantity.units * product.quantities.unit_g / 100)).toFixed(2));
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

  onProductChanged(term: string) {
    this.selectedProduct = this.getSelectedProductByName(term);

    if (Object.keys(this.selectedProduct).length > 0) {
      this.selectedProducts.push(this.selectedProduct);
      this.calculateTotals();
      this.searchTerm = "";
    }
  }

  getSelectedProductByName(selectedName: string): SelectedProductDTO {
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
        units: product.quantities.unit_g?1:null
      }
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

  updatePieChart(): void {
    this.chartData.next({
      ...this.chartData.value,
      datasets: [{
        data: [this.totals.proteins, this.totals.carbs, this.totals.fats],
        backgroundColor: [
          '#059669',
          '#DAC650',
          '#C72D45'
        ]
      }]
    })
  }
}
