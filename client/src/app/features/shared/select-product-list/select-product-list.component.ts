import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductDTO} from "../../../shared/dto/product.dto";
import {SelectedProductDTO} from "../../../shared/dto/selected-product.dto";

@Component({
  selector: 'calorie-app-select-product-list',
  templateUrl: './select-product-list.component.html',
  styleUrls: ['./select-product-list.component.scss'],
})
export class SelectProductListComponent {
  @Input('products') products: ProductDTO[];
  @Input('selectedProducts') selectedProducts: SelectedProductDTO[];
  @Output() quantityChangeEvent = new EventEmitter<SelectedProductDTO>();
  @Output() removeItemEvent = new EventEmitter<number>();

  trackByIndex(index: number, object: any): number {
    return index;
  }
  quantityChange(p: SelectedProductDTO) {
    this.quantityChangeEvent.emit(p)
  }
  removeItem(i: number) {
    this.removeItemEvent.emit(i)
  }
}
