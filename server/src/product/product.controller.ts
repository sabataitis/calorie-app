import { Body, Controller, Get, Post, Query, UseGuards, Request } from "@nestjs/common";
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

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('component') component: string){
    return this.productService.findAll(req.user.userId, component);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createProductDTO: any){
    return this.productService.create(req.user.userId, createProductDTO);
  }

}
