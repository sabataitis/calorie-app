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

  getQuantity(index: number, measurement: string): number {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      return this.selectedProducts[index].quantity.grams;
    }
    return this.selectedProducts[index].quantity.units;
  }

  calculateNutrients(index: number, measurement: string, product: ProductDTO): void {
    if (measurement === QUANTITY_SELECTION.GRAM) {
      for(const nutrient in this.selectedProducts[index].nutrients){
        let concatKey = nutrient.concat('_100g');
        this.selectedProducts[index].nutrients[nutrient as keyof NutrientsType]= Number((product[concatKey] * (this.getQuantity(index, measurement) / 100)).toFixed(2));
      }
    } else {
      for(const nutrient in this.selectedProducts[index].nutrients){
        let concatKey = nutrient.concat('_100g');
        this.selectedProducts[index].nutrients[nutrient as keyof NutrientsType]= Number((product[concatKey] * (this.getQuantity(index, measurement) * product.quantities.unit_g / 100)).toFixed(2));
      }
    }
  }


  quantityChange(index: number) {
    const product = this.products.find(product => product._id === this.selectedProducts[index].productId);
    switch (this.selectedProducts[index].quantity.selected) {
      case QUANTITY_SELECTION.GRAM:
        this.calculateNutrients(index, QUANTITY_SELECTION.GRAM, product);
        break;
      case QUANTITY_SELECTION.UNIT:
        this.calculateNutrients(index, QUANTITY_SELECTION.UNIT, product);
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
        calories: product.calories_100g,
        proteins: product.proteins_100g,
        carbs: product.carbs_100g,
        fats: product.fats_100g,
      },
      quantity: {
        hasUnits: !!product.quantities.unit_g,
        selected: QUANTITY_SELECTION.GRAM,
        grams: 100,
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
