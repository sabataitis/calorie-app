import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum QUANTITY_SELECTION{
  GRAM = "gram",
  UNIT = "unit",
}

export class QuantityEnteredDTO{
  @IsEnum(QUANTITY_SELECTION)
  selected: QUANTITY_SELECTION;

  @IsNumber()
  @IsOptional()
  units?: number;

  @IsNumber()
  @IsOptional()
  grams?: number;

}

export class ProductsEnteredDTO{
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsNumber()
  calories: number;

  @IsNumber()
  proteins: number;

  @IsNumber()
  carbs: number;

  @IsNumber()
  fats: number;

  @Type(()=> QuantityEnteredDTO)
  quantity: QuantityEnteredDTO;
}

export class UserProductDTO{
  @IsString()
  userId: string;

  @Type(()=> ProductsEnteredDTO)
  @IsArray()
  @ValidateNested({each: true})
  products: ProductsEnteredDTO[];
}
