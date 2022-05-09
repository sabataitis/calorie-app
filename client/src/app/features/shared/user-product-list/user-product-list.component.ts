import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductDTO} from "../../../shared/dto/product.dto";
import {QUANTITY_SELECTION, SelectedProductDTO} from "../../../shared/dto/selected-product.dto";
import {UserProductDTO, UserProductListDTO} from "../../../shared/dto/user-product.dto";

@Component({
  selector: 'calorie-app-user-product-list',
  templateUrl: './user-product-list.component.html',
  styleUrls: ['./user-product-list.component.scss']
})
export class UserProductListComponent {
  @Input('userProducts') userProducts: UserProductListDTO[];
  @Output() quantityChangeEvent = new EventEmitter<UserProductListDTO>();
  @Output() removeItemEvent = new EventEmitter<number>();
  @Output() toggleEditModeEvent = new EventEmitter<UserProductListDTO>();

  trackByIndex(index: number, object: any): number {
    return index;
  }
  quantityChange(p: UserProductListDTO) {
    this.quantityChangeEvent.emit(p)
  }
  removeItem(i: number) {
    this.removeItemEvent.emit(i)
  }
  toggleEditMode(product: UserProductListDTO){
    this.toggleEditModeEvent.emit(product);
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
}
