import { Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { EnteredProduct, EnteredProductDocument } from "../common/schemas/entered-product.schema";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { User, UserDocument } from "../common/schemas/user";
import { UserProductDTO } from "../common/dto/userProduct.dto";

@Injectable()
export class EnteredProductService {
  constructor(@InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

  async barChart(userId: string, query: string) {
    const offset: number = new Date().getTimezoneOffset() * 60000;
    const date: Date = new Date(new Date(query).getTime() + offset);

    const from: Date = startOfDay(subDays(date, 2));
    const to: Date = endOfDay(date);

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
    const user: UserDocument = await this.userModel.findById(userId);

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

  async create(userId: string, payload: UserProductDTO) {
    return Promise.all(payload.products.map(product => {
      return this.userProductModel.create({ userId: userId, ...product });
    }));
  }

  async update(id: string, payload: any) {
    const enteredProduct = await this.userProductModel.findById(id);
    enteredProduct.nutrients = {
      calories: Number(payload.nutrients.calories.toFixed(2)),
      proteins: Number(payload.nutrients.proteins.toFixed(2)),
      carbs: Number(payload.nutrients.carbs.toFixed(2)),
      fats: Number(payload.nutrients.fats.toFixed(2)),
    };
    enteredProduct.quantity = payload.quantity;
    await enteredProduct.save();

    return payload;
  }

  async delete(id: string) {
    await this.userProductModel.deleteOne({ _id: id });
    return { id };
  }

}
