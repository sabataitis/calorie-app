import { Module } from '@nestjs/common';
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "../common/schemas/product";
import { UserProduct, UserProductSchema } from "../common/schemas/user-product.schema";

@Module({
  controllers: [ProductController],
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}, {name: UserProduct.name, schema: UserProductSchema}])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
