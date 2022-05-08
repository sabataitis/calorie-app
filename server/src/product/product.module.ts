import { Module } from '@nestjs/common';
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller";
import { Product, ProductSchema } from "../common/schemas/product";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";

@Module({
  controllers: [ProductController],
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}, {name: EnteredProduct.name, schema: EnteredProductSchema}])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
