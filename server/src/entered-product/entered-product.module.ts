import { Module } from '@nestjs/common';
import { EnteredProductService } from "./entered-product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EnteredProductController } from "./entered-product.controller";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";
import { User, UserSchema } from "../common/schemas/user";

@Module({
  controllers: [EnteredProductController],
  imports: [MongooseModule.forFeature([{name: EnteredProduct.name, schema: EnteredProductSchema}, {name: User.name, schema: UserSchema}])],
  providers: [EnteredProductService],
  exports: [EnteredProductService]
})
export class EnteredProductModule {}
