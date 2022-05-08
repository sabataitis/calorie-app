import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

@Schema()
export class Product {
  @Prop({
    unique: true
  })
  name: string;

  @Prop()
  category: string;

  @Prop( {type: Nutrients})
  nutrients: Nutrients;

  @Prop( {type: Quantities})
  quantities: Quantities;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
