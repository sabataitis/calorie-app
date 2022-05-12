import {SelectedProductDTO} from "./selected-product.dto";

export interface CreateProductDTO{
  name: string,
  category: string,
  isMeal: boolean,
  nutrients:{
    calories:number,
    proteins: number,
    carbs: number,
    fats: number,
  },
  quantities:{
    quantity_g: number,
    unit_g: number
  },
  ingredients?: SelectedProductDTO[]
}
