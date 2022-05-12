import { IsNumber, IsOptional } from "class-validator";

export class QuantitiesDTO{
  @IsOptional()
  @IsNumber()
  quantity_g: number;

  @IsOptional()
  @IsNumber()
  unit_g: number;
}
