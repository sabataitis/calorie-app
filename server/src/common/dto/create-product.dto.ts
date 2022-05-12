import { IsBoolean, IsOptional, IsString } from "class-validator";
import { NutrientsDTO, ProductsEnteredDTO } from "./userProduct.dto";
import { Type } from "class-transformer";
import { QuantitiesDTO } from "./quantities.dto";

export class CreateProductDTO{
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsBoolean()
  isMeal: boolean;

  @Type(()=> NutrientsDTO)
  nutrients: NutrientsDTO

  @Type(()=> QuantitiesDTO)
  quantities: QuantitiesDTO

  @IsOptional()
  ingredients?: ProductsEnteredDTO[]
}
