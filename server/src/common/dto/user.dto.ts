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
  goalNum?: number;

  @IsNumber()
  @IsOptional()
  calories?: number;

}

export class CreateUserDTO{
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
  goalNum?: number;
}


