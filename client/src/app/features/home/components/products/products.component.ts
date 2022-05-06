import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AuthUserDTO} from "../../../../shared/dto/user.dto";
import {ProductDTO} from "../../../../shared/dto/product.dto";

import {ChartData} from "chart.js";
import {BehaviorSubject} from "rxjs";
import {QUANTITY_SELECTION, SelectedProductDTO} from "../../../../shared/dto/selected-product.dto";

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
  totals ={
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  }

  chartOptions: any= {
    responsive: true,
    plugins:{
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
        data: [0,0,0],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ]
      }],
  });

  ngOnChanges(changes: SimpleChanges) {
    if(changes['products'].currentValue){
      this.products = changes['products'].currentValue;
    }
  }

  trackByIndex(index: number, object: any): number{
    return index;
  }

  saveProducts(): void{
    this.saveProductsEvent.emit(this.selectedProducts);
  }

  removeItem(index: number){
    this.selectedProducts.splice(index, 1);
    this.calculateTotals();
  }

  quantityChange(index: number, quantity: number){
    const product = this.products.find(product=> product._id === this.selectedProducts[index].productId);

    this.selectedProducts[index].calories = Number((product.calories_100g * (quantity / 100)).toFixed(2));
    this.selectedProducts[index].proteins = Number((product.proteins_100g * (quantity / 100)).toFixed(2));
    this.selectedProducts[index].carbs = Number((product.carbs_100g * (quantity / 100)).toFixed(2));
    this.selectedProducts[index].fats = Number((product.fats_100g * (quantity / 100)).toFixed(2));
    this.calculateTotals();
  }

  onProductChanged(term: string){
    this.selectedProduct = this.getSelectedProductByName(term);
    if(Object.keys(this.selectedProduct).length>0){
      this.selectedProducts.push(this.selectedProduct);
      this.calculateTotals();
      this.searchTerm = "";
    }
  }
  getSelectedProductByName(selectedName: string): SelectedProductDTO {
    const product = this.products.find(product=> product.name === selectedName);

    return {
      productId: product._id,
      productName: product.name,
      calories: product.calories_100g,
      proteins: product.proteins_100g,
      carbs: product.carbs_100g,
      fats: product.fats_100g,
      quantity: {
        selected: QUANTITY_SELECTION.GRAM,
        grams: 100,
        units: null
      }
    }
  }

  calculateTotals(): void{
    this.totals = {calories: 0, proteins: 0, carbs: 0, fats: 0};
    this.selectedProducts.forEach((product: SelectedProductDTO)=>{
      this.totals.calories+= product.calories;
      this.totals.proteins+= product.proteins;
      this.totals.carbs+= product.carbs;
      this.totals.fats+= product.fats;
    })
    this.updatePieChart();
  }
  updatePieChart(): void{
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
