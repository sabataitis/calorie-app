import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsOptional } from "class-validator";
import { User } from "./user";
import * as Mongoose from "mongoose";
import { ProductsEnteredDTO } from "../dto/userProduct.dto";

export type ProductDocument = Product & Document;

export class Quantities{
  quantity_g: number;
  unit_g: number;
}

export class Nutrients{
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export class Ingredients{
  _id: string;
  name: string;
  category: string;
  nutrients: Nutrients;
  quantities: Quantities;
}

@Schema()
export class Product {
  @Prop({
    unique: true
  })
  name: string;

  @Prop()
  category: string;

  @Prop({type: Nutrients})
  nutrients:{
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }

  @Prop( {type: Quantities})
  quantities: Quantities;

  @Prop({default: false})
  isMeal: boolean;

  @IsOptional()
  @Prop({type: ProductsEnteredDTO})
  ingredients: ProductsEnteredDTO[]

  @Prop({default: null, ref: User.name})
  for: Mongoose.Schema.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
