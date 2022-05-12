import { Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";
import { endOfDay, isToday, startOfDay, subDays } from "date-fns";
import { User, UserDocument } from "../common/schemas/user";

@Injectable()
export class EnteredProductService {
  constructor(@InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductSchema>, @InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async polarChart(userId: string, query: string) {
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

  async barChart(userId: string, days: number) {
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const currentDate: Date = new Date(new Date().getTime() + offset);

    const from: Date = startOfDay(subDays(currentDate, days));
    const to: Date = endOfDay(currentDate);

    return this.userProductModel.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: from, $lte: to } } },
      {
        $group: {
          _id: { $dayOfMonth: { date: "$createdAt", timezone: "Europe/Vilnius" } },
          items: { $push: { _id: "$_id", calories: "$nutrients.calories" } }
        }
      },
      { $project: { _id: 0, day: "$_id", sum: { $sum: "$items.calories" } } }
    ]).sort({ day: 1 });
  }

  async findAllUserProducts(userId: string, query: string) {
    const user: any = await this.userModel.findById(userId);

    const offset: number = new Date().getTimezoneOffset() * 60000;
    const date: Date = new Date(new Date(query).getTime() + offset);

    const from: Date = startOfDay(date);
    const to: Date = endOfDay(date);

    const products = await this.userProductModel.find({
      userId,
      createdAt: { $gte: from, $lte: to }
    }).sort({ createdAt: 1 }).populate("productId").lean();

    if (!user?.updates) {
      return {
        products,
        previousInfo: null
      };
    } else {
      const latestUpdatesFound = user.updates.filter(update => update.to > from);
      return {
        products,
        previousInfo: latestUpdatesFound[latestUpdatesFound.length - 1]
      };
    }
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

  async delete(id: string) {
    await this.userProductModel.deleteOne({ _id: id });
    return { id };
  }


}
