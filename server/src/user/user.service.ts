import { Injectable } from "@nestjs/common";
import { CreateUserDTO, UserDTO } from "../common/dto/user.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Updates, User, UserDocument } from "../common/schemas/user";

import * as bcrypt from "bcrypt";
import { calculateCalorieGoal } from "../common/utils/calculate-calorie-goal";
import { calculateRecommendations } from "../common/utils/calculate-recommendations";
import { UpdateUserDTO } from "../common/dto/update-user.dto";
import { FORMULA } from "../common/enum/formula.enum";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
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

  async create(user: CreateUserDTO): Promise<any>{
    const hash = await bcrypt.hash(user.password, 10);
    const currentDate = new Date();

    const newUser = new this.userModel({
      ...user,
      username: user.username,
      password: hash,
      formulas: [{from: currentDate, to: null, formula: FORMULA.HARRIS_BENEDICT}],
    });

    const calories = calculateCalorieGoal(user, FORMULA.HARRIS_BENEDICT);
    const recommendation = calculateRecommendations(user.age, calories);

    newUser.calories =  calories;
    newUser.recommendations = recommendation;

    return newUser.save();
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<any>{
    const currentUser = await this.userModel.findById(id);
    const currentDate = new Date();

    if(currentUser?.updates){
      currentUser.updates = [
        ...currentUser?.updates,
        {
          from: currentDate,
          to: null,
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
