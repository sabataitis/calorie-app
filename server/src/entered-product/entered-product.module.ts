import { Module } from '@nestjs/common';
import { EnteredProductService } from "./entered-product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { EnteredProductController } from "./entered-product.controller";
import { EnteredProduct, EnteredProductSchema } from "../common/schemas/entered-product.schema";

@Module({
  controllers: [EnteredProductController],
  imports: [MongooseModule.forFeature([{name: EnteredProduct.name, schema: EnteredProductSchema}])],
  providers: [EnteredProductService],
  exports: [EnteredProductService]
})
export class EnteredProductModule {}
