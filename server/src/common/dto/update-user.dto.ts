import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { GOALS } from "../enum/goals.enum";
import { ACTIVITY_FACTOR } from "../enum/activity-factor.enum";
import { FORMULA } from "../enum/formula.enum";

export class UpdateUserDTO{
  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  age: number;

  @IsString()
  activity: ACTIVITY_FACTOR;

  @IsString()
  goal: GOALS;

  @IsOptional()
  @IsNumber()
  goalNum?: number;

  @IsString()
  formula: FORMULA;
}


