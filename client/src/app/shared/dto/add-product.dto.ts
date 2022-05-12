import {SelectedProductDTO} from "./selected-product.dto";

export interface AddProductDTO{
  name: string,
  category: string,
  measurement: string,
  measurementByUnit: number,
  mealPortionSize?: number,
  isMeal: boolean,
  calories: number,
  proteins: number,
  carbs: number,
  fats: number,
  totals?: {
    grams: number,
    calories: number,
    proteins: number,
    carbs: number,
    fats: number,
  },
  ingredients?: SelectedProductDTO[]
}
