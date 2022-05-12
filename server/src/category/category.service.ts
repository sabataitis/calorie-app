import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../common/schemas/category";
import categoriesJSON from "../common/data/categories.json";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>){}

  async seed(): Promise<void>{
    const bulkWriteOptions = categoriesJSON.map(function (category) {
        return {
          updateOne: {
            filter: { name: category.name },
            update: category,
            upsert: true,
            new: true
          }
        }
      }
    );
    try {
      await this.categoryModel.bulkWrite(bulkWriteOptions);
    } catch (err) {
      throw new HttpException('Error Seeding Categories', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(where: {field: string, value: string | number} = null){
    return this.categoryModel.find(where || {}).lean();
  }
}
