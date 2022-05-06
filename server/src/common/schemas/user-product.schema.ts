import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "./user";
import { Product } from "./product";

export type UserProductDocument = UserProduct & Document;

export class Quantity{
  selected: string;
  units?: number;
  grams?: number;
}

export class Entered{
  entered:{
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    quantity: Quantity;
  }
}

@Schema()
export class UserProduct {
  @Prop({ref: User.name})
  userId: string;

  @Prop({ref: Product.name})
  productId: string;

  @Prop({type: Entered })
  entered:{
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    quantity:{
      selected: string,
      units: number,
      grams: number,
    },
  }
}

export const UserProductSchema = SchemaFactory.createForClass(UserProduct);
