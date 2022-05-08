import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../common/schemas/user";
import { UserController } from "./user.controller";
import { Product, ProductSchema } from "../common/schemas/product";
import { ProductService } from "../product/product.service";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Product.name, schema: ProductSchema}, {name: EnteredProduct.name, schema: EnteredProductSchema}])],
  providers: [UserService, ProductService],
  exports: [UserService]
})
export class UserModule {}
