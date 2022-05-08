import {SelectedProductDTO} from "./selected-product.dto";
import {ProductDTO} from "./product.dto";

export interface UserProductDTO extends Omit<SelectedProductDTO, 'productId'>{
  _id: string,
  productId: ProductDTO
}

export interface UserProductListDTO extends UserProductDTO{
  editMode: boolean,
  changesMade: boolean,
}
