import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user";
import { Nutrients, Product } from "./product";
import * as Mongoose from "mongoose";

export type EnteredProductSchema = EnteredProduct & Document;

export class Quantity{
  hasUnits: boolean;
  selected: string;
  units?: number;
  grams?: number;
}

@Schema({timestamps: true})
export class EnteredProduct {
  @Prop({ref: User.name, type: Mongoose.Schema.Types.ObjectId})
  userId: Mongoose.Schema.Types.ObjectId;

  @Prop({ref: Product.name, type: Mongoose.Schema.Types.ObjectId})
  productId: Mongoose.Schema.Types.ObjectId;

  @Prop()
  productName: string;

  @Prop({type: Nutrients})
  nutrients:{
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }

  @Prop({type: Quantity})
  quantity:{
    hasUnits: boolean,
    selected: string,
    grams: number,
    units: number,
  }
}

export const EnteredProductSchema = SchemaFactory.createForClass(EnteredProduct);
