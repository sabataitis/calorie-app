import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ACTIVITY_FACTOR } from "../enum/activity-factor.enum";
import { GOALS } from "../enum/goals.enum";
import { FORMULA } from "../enum/formula.enum";

export type UserDocument = User & Document;

export class FromTo {
  from: Date;
  to: Date;
}

export class FromToNumber {
  from: Date;
  to: Date;
}

export class Recommendation {
  recommendation: NutrientRecommendation
}
export class NutrientRecommendation {
  proteins: FromToNumber;
  carbs: FromToNumber;
  fats: FromToNumber;
}

export class Updates extends FromTo{
  @Prop()
  age: number;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({enum: ACTIVITY_FACTOR})
  activity: ACTIVITY_FACTOR;

  @Prop({enum: GOALS})
  goal: GOALS;

  @Prop()
  goalNum: number;

  @Prop()
  calories: number;

  @Prop({ type: Recommendation })
  recommendations: Recommendation

  @Prop({enum: FORMULA})
  formula: FORMULA
}


@Schema({timestamps: true})
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
  goalNum: number;

  @Prop()
  calories: number;

  @Prop({ type: Recommendation })
  recommendations: Recommendation

  @Prop()
  formula: FORMULA

  @Prop({type: Updates})
  updates: Updates[]

  @Prop()
  createdAt: Date

}

export const UserSchema = SchemaFactory.createForClass(User);
