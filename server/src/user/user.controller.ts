import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "../common/dto/user.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDomainName } from "./name.const";
import { EnteredProductService } from "../entered-product/entered-product.service";

@Controller(UserDomainName)
export class UserController{
  constructor(private userService: UserService, private enteredProductService: EnteredProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('products')
  products(@Request() req, @Query('date') dateQuery){
    return this.enteredProductService.findAllUserProducts(req.user.userId, dateQuery);
  }

  @UseGuards(JwtAuthGuard)
  @Get('polar-chart')
  categoryGraph(@Request() req, @Query('date') query){
    return this.enteredProductService.polarChart(req.user.userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('bar-chart')
  linearGraph(@Request() req, @Query('days') query){
    return this.enteredProductService.barChart(req.user.userId, query);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO){
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
