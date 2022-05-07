import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { UserDTO } from "../common/dto/user.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDomainName } from "./name.const";
import { ProductService } from "../product/product.service";

@Controller(UserDomainName)
export class UserController{
  constructor(private userService: UserService, private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('products')
  products(@Request() req){
    return this.productService.findAllUserProducts(req.user.userId);
  }

  @Post()
  async create(@Body() createUserDTO: UserDTO){
    return this.userService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req){
    return req.user;
  }

  @Get('usernames')
  async getUsernames(){
    return this.userService.getUsernames();
  }

}
