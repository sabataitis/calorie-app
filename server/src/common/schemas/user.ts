import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ACTIVITY_FACTOR } from "../enum/activity-factor.enum";
import { GOALS } from "../enum/goals.enum";
import { IsNumber } from "class-validator";

export type UserDocument = User & Document;

export class Recommendation {
  @IsNumber()
  from: number;

  @IsNumber()
  to: number;
}

export class Recommendations {
  proteins: Recommendation;
  carbs: Recommendation;
  fats: Recommendation;
}

@Schema()
export class User {
  @Prop({
    unique: true
  })
  username: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ enum: ACTIVITY_FACTOR })
  activity: ACTIVITY_FACTOR;

  @Prop({ enum: GOALS })
  goal: GOALS;

  @Prop()
  calories: number;

  @Prop({ type: Recommendations })
  recommendations: {
    proteins: {
      from: number,
      to: number,
    },
    carbs: {
      from: number,
      to: number,
    },
    fats: {
      from: number,
      to: number,
    },
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
