import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CategoryDomainName } from "./name.const";
import { CategoryService } from "./category.service";

@Controller(CategoryDomainName)
export class CategoryController{
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('seed')
  seed(){
    return this.categoryService.seed();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(){
    return this.categoryService.findAll();
  }
}
