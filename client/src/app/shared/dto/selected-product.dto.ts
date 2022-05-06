export enum QUANTITY_SELECTION{
  GRAM = "gram",
  UNIT = "unit",
}

export interface SelectedProductDTO{
  productId: string,
  productName: string,
  calories: number,
  proteins: number,
  carbs: number,
  fats: number,
  quantity:{
    selected: QUANTITY_SELECTION,
    units?: number,
    grams?: number,
  }
}
