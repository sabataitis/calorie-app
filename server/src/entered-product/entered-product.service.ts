import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";

@Injectable()
export class EnteredProductService {
  constructor(@InjectModel(EnteredProduct.name) private userProductModel: Model<EnteredProductSchema>) {}

  async create(payload: any){
    return Promise.all(payload.products.map(product=>{
      return this.userProductModel.create({userId: payload.userId, ...product});
    }))
  }

  async update(id: string, payload: any){
    const enteredProduct = await this.userProductModel.findById(id);
    enteredProduct.nutrients = payload.nutrients;
    enteredProduct.quantity = payload.quantity;
    await enteredProduct.save();

    return payload;
  }

}
