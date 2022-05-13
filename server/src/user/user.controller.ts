import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "../common/dto/user.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDomainName } from "./name.const";
import { EnteredProductService } from "../entered-product/entered-product.service";
import { UpdateUserDTO } from "../common/dto/update-user.dto";

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

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Request() req,@Body() updateUserDTO: UpdateUserDTO){
    return this.userService.update(req.user.userId, updateUserDTO);
  }

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO){
    return this.userService.create(createUserDTO);
  }

  @Get('usernames')
  async getUsernames(){
    return this.userService.getUsernames();
  }

  @UseGuards(JwtAuthGuard)
  @Get('earliest-entry-date')
  async earliestEntryDate(@Request() req){
    return this.userService.earliestEntryDate(req.user.userId);
  }

}
