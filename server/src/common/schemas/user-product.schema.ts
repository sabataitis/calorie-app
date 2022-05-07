import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user";
import { Product } from "./product";

export type UserProductDocument = UserProduct & Document;

export class Quantity{
  hasUnits: boolean;
  selected: string;
  units?: number;
  grams?: number;
}

export class Nutrients{
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

@Schema({timestamps: true})
export class UserProduct {
  @Prop({ref: User.name})
  userId: string;

  @Prop({ref: Product.name})
  productId: string;

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

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);
