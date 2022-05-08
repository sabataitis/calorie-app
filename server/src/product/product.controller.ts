import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ProductDomainName } from "./name.const";
import { ProductService } from "./product.service";

@Controller(ProductDomainName)
export class ProductController{
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('seed')
  seed(){
    return this.productService.seed();
  }

  @Get()
  findAll(){
    return this.productService.findAll();
  }
}
