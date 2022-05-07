import { Injectable } from "@nestjs/common";
import { CreateUserDTO, UserDTO } from "../common/dto/user.dto";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../common/schemas/user";

import * as bcrypt from 'bcrypt';
import { calculateCalorieGoal } from "../common/utils/calculate-calorie-goal";
import { calculateRecommendations } from "../common/utils/calculate-recommendations";

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

  async create(user: CreateUserDTO): Promise<UserDTO>{
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({...user, password: hash});
    const calories = calculateCalorieGoal(user);
    const recommendations = calculateRecommendations(user.age, calories);

    newUser.calories = calories
    newUser.recommendations = recommendations;

    return newUser.save();
  }
}
