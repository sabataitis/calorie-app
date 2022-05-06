import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDTO{
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  gender: string;

  @IsNumber()
  age: number;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsString()
  activity: string;

  @IsString()
  goal: string;

  @IsNumber()
  @IsOptional()
  calories?: number;
}

