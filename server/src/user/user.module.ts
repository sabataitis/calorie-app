import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../common/schemas/user";
import { UserController } from "./user.controller";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";
import { EnteredProductService } from "../entered-product/entered-product.service";

@Module({
  controllers: [UserController],
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: EnteredProduct.name, schema: EnteredProductSchema }
  ])],
  providers: [UserService, EnteredProductService],
  exports: [UserService]
})
export class UserModule {
}
