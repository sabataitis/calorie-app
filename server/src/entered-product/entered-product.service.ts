import { Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";
import { endOfDay, startOfDay, subDays } from "date-fns";

@Injectable()
export class EnteredProductService {
  constructor(@InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductSchema>) {
  }

  async categoryGraph(userId: string, query: string) {
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const date: Date = new Date(new Date(query).getTime() + offset);

    const from: Date = startOfDay(date);
    const to: Date = endOfDay(date);

    const caloriesByCategory = await this.userProductModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: from, $lte: to } } },
      { $lookup: { from: "products", localField: "productId", foreignField: "_id", as: "product" } },
      { $group: { _id: { name: "$product.category" }, items: { $push: "$nutrients.calories" } } },
      { $project: { _id: 0, name: { $arrayElemAt: ["$_id.name", 0] }, sum: { $sum: "$items" } } }
    ]);

    return {
      caloriesByCategory
    };
  }

  async linearGraph(userId: string, days: number) {
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const currentDate: Date = new Date(new Date().getTime() + offset);

    const from: Date = startOfDay(subDays(currentDate, days));
    const to: Date = endOfDay(currentDate);

    const linearCalories = await this.userProductModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: from, $lte: to } } },
      { $sort: { "createdAt": 1 } },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          items: { $push: { calories: "$nutrients.calories", createdAt: { $hour: "$createdAt" } } }
        }
      },
      { $project: { _id: 1, items: 1 } }
    ]);

    return {
      linearCalories
    };
  }

  async findAllUserProducts(userId: string, query: string) {
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const date: Date = new Date(new Date(query).getTime() + offset);

    const from: Date = startOfDay(date);
    const to: Date = endOfDay(date);

    return this.userProductModel.find({
      userId,
      createdAt: { $gte: from, $lte: to }
    }).sort({ createdAt: -1 }).populate("productId").lean();
  }

  async create(payload: any) {
    return Promise.all(payload.products.map(product => {
      return this.userProductModel.create({ userId: payload.userId, ...product });
    }));
  }

  async update(id: string, payload: any) {
    const enteredProduct = await this.userProductModel.findById(id);
    enteredProduct.nutrients = payload.nutrients;
    enteredProduct.quantity = payload.quantity;
    await enteredProduct.save();

    return payload;
  }

}
