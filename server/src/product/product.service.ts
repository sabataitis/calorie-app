import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../common/schemas/product";
import productsJSON from "../common/data/products.json";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, @InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductSchema>) {}

  async seed(): Promise<void>{
    const bulkWriteOptions = productsJSON.map(function (product) {
        return {
          updateOne: {
            filter: { name: product.name },
            update: product,
            upsert: true,
            new: true
          }
        }
      }
    );
    try {
      await this.productModel.bulkWrite(bulkWriteOptions);
    } catch (err) {
      throw new HttpException('Error Seeding Products', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOne(where: {field: string, value: string | number} = null): Promise<any> {
    return this.productModel.findOne(where).lean();
  }
  async findAll(where: {field: string, value: string | number} = null){
    return this.productModel.find(where || {}).lean();
  }
  async findAllUserProducts(userId: string){
    return this.userProductModel.find({userId} || {}).populate('productId').lean();
  }
}
