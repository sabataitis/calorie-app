export enum QUANTITY_SELECTION{
  GRAM = "gram",
  UNIT = "unit",
}

export interface NutrientsType{
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}
export interface QuantityType{
  hasUnits: boolean,
  selected: QUANTITY_SELECTION,
  units?: number,
  grams?: number,
}


export interface SelectedProductDTO{
  productId: string,
  productName: string,
  nutrients: NutrientsType;
  quantity: QuantityType;
}
