import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

export class Quantities{
  quantity_g: number;
  unit_g: number;
}

@Schema()
export class Product {
  @Prop({
    unique: true
  })
  name: string;

  @Prop()
  calories_100g: number;

  @Prop()
  proteins_100g: number;

  @Prop()
  carbs_100g: number;

  @Prop()
  fats_100g: number;

  @Prop()
  category: string;

  @Prop( {type: Quantities})
  quantities: {
    quantity_g: number,
    unit_g: number,
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
