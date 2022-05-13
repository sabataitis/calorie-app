import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export enum QUANTITY_SELECTION{
  GRAM = "gram",
  UNIT = "unit",
}

export class QuantityDTO{
  @IsBoolean()
  hasUnits: boolean;

  @IsEnum(QUANTITY_SELECTION)
  selected: QUANTITY_SELECTION;

  @IsNumber()
  @IsOptional()
  units?: number;

  @IsNumber()
  @IsOptional()
  grams?: number;
}

export class NutrientsDTO{
  @IsNumber()
  calories: number;

  @IsNumber()
  proteins: number;

  @IsNumber()
  carbs: number;

  @IsNumber()
  fats: number;
}

export class ProductsEnteredDTO{
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @Type(()=> NutrientsDTO)
  nutrients: NutrientsDTO;

  @Type(()=> QuantityDTO)
  quantity: QuantityDTO;
}

export class UserProductDTO{
  @Type(()=> ProductsEnteredDTO)
  @IsArray()
  @ValidateNested({each: true})
  products: ProductsEnteredDTO[];
}
