import { Module } from '@nestjs/common';
import { CategoryService } from "./category.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryController } from "./category.controller";
import { Category, CategorySchema } from "../common/schemas/category";

@Module({
  controllers: [CategoryController],
  imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
