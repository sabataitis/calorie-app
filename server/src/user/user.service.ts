import { Injectable } from "@nestjs/common";
import { CreateUserDTO, UserDTO } from "../common/dto/user.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../common/schemas/user";

import * as bcrypt from "bcrypt";
import { calculateCalorieGoal } from "../common/utils/calculate-calorie-goal";
import { calculateRecommendations } from "../common/utils/calculate-recommendations";
import { UpdateUserDTO } from "../common/dto/update-user.dto";
import { FORMULA } from "../common/enum/formula.enum";
import { format, startOfDay, subDays } from "date-fns";
import { EnteredProduct, EnteredProductDocument } from "../common/schemas/entered-product.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, @InjectModel(EnteredProduct.name) private enteredProductModel: Model<EnteredProductDocument>) {
  }

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({username}).lean();
  }

  async findById(id: string): Promise<Partial<UserDTO>>{
    return this.userModel.findById(id).lean();
  }

  async getUsernames(): Promise<string[]>{
    const response = await this.userModel.find({}, {_id: 0, username: 1});
    return response.map(obj=> obj.username);
  }

  async earliestEntryDate(userId: string): Promise<any>{
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const response = await this.enteredProductModel.find({userId}).sort({createdAt: 1});
    if(response.length){
      return {response: format(new Date(response[0].createdAt).getTime()+offset, "yyyy-MM-dd")};
    }
    return {response: format(new Date().getTime()+offset, "yyyy-MM-dd")};
  }

  async create(user: CreateUserDTO): Promise<any>{
    const hash = await bcrypt.hash(user.password, 10);

    const newUser = new this.userModel({
      ...user,
      username: user.username,
      password: hash,
      formulas: FORMULA.HARRIS_BENEDICT,
    });

    const calories = calculateCalorieGoal(user, FORMULA.HARRIS_BENEDICT);
    const recommendation = calculateRecommendations(user.age, calories);

    newUser.calories =  calories;
    newUser.recommendations = recommendation;

    return newUser.save();
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<any>{
    const currentUser = await this.userModel.findById(id);
    const date: string = format(new Date(), "yyyy-MM-dd");
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const currentDate: Date = new Date(new Date(date).getTime() + offset);

    if(currentUser?.updates){
      currentUser.updates[currentUser.updates.length-1].to = currentDate;
      currentUser.updates = [
        ...currentUser?.updates,
        {
          from: currentUser.updates[currentUser.updates.length-1].to,
          to: startOfDay(subDays(currentDate,1)),
          height: currentUser.height,
          weight: currentUser.weight,
          activity: currentUser.activity,
          age: currentUser.age,
          goal: currentUser.goal,
          goalNum: currentUser.goalNum,
          calories: currentUser.calories,
          recommendations: currentUser.recommendations,
          formula: currentUser?.formula || null
        }
      ]
    } else{
      currentUser.updates = [
        {
          from: currentUser.createdAt,
          to: currentDate,
          height: currentUser.height,
          weight: currentUser.weight,
          activity: currentUser.activity,
          age: currentUser.age,
          goal: currentUser.goal,
          goalNum: currentUser.goalNum,
          calories: currentUser.calories,
          recommendations: currentUser.recommendations,
          formula: currentUser?.formula || null
        }
      ]
    }

    currentUser.height = updateUserDTO.height;
    currentUser.weight = updateUserDTO.weight;
    currentUser.age = updateUserDTO.age;
    currentUser.activity = updateUserDTO.activity;
    currentUser.goal = updateUserDTO.goal;
    currentUser.goalNum = updateUserDTO.goalNum;
    currentUser.formula = updateUserDTO.formula;

    const calories = calculateCalorieGoal(currentUser, currentUser.formula);
    const recommendations = calculateRecommendations(currentUser.age, calories);

    currentUser.calories = calories;
    currentUser.recommendations = recommendations;

    const updated = await currentUser.save();

    return {
      _id: updated._id,
      username: updated.username,
      age: updated.age,
      height: updated.height,
      weight: updated.weight,
      activity: updated.activity,
      goal: updated.goal,
      goalNum: updated.goalNum,
      calories: updated.calories,
      recommendations: updated.recommendations,
      formula: updated.formula,
    }
  }
}
